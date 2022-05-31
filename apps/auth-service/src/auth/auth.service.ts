import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import {
  RegisterFailUserExisted,
  SignInFailInvalidRequest,
} from '@todo-microservices/shared/exceptions'
import {
  Auth,
  AuthDocument,
  User,
  UserDocument,
} from '@todo-microservices/shared/models'
import { Model } from 'mongoose'
import { JwtService } from './jwt/jwt.service'
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'

@Injectable()
export class AuthService {
  @Inject(JwtService)
  private readonly jwtService: JwtService

  constructor(
    @InjectModel(Auth.name) private authRepo: Model<AuthDocument>,
    /*
      TODO: User Repo should not be use in this service
      will need to remove this and store required information in auth collection
    */
    @InjectModel(User.name) private userRepo: Model<UserDocument>
  ) {}

  async register(email: string, password: string): Promise<string> {
    const exist = await this.userRepo.findOne({ email })
    if (exist) {
      throw RegisterFailUserExisted
    }

    const newUser: User = {
      email: email,
      password: this.encodePassword(password),
    }
    const userDocument: UserDocument = await this.userRepo.create(newUser)

    const token = this.jwtService.generateToken({
      email: userDocument.email,
      sub: userDocument.id,
    })
    await this.authRepo.create({ token: token, userId: userDocument.id })

    return token
  }

  async signIn(email: string, password: string): Promise<string> {
    const exist = await this.userRepo.findOne({ email })
    if (!exist) {
      throw SignInFailInvalidRequest
    }

    if (!this.comparePassword(password, exist.password)) {
      throw SignInFailInvalidRequest
    }

    const token = this.jwtService.generateToken({
      email: exist.email,
      sub: exist.id,
    })
    await this.authRepo.create({ token: token, userId: exist.id })
    return token
  }

  async validate(token: string): Promise<UserDocument> {
    this.jwtService.verifyToken(token)

    const claim = await this.jwtService.decode(token)

    const user = await this.jwtService.validateUser(claim)

    return user
  }

  private encodePassword(password: string) {
    const salt = genSaltSync(10)
    return hashSync(password, salt)
  }

  private comparePassword(
    reqPassword: string,
    actualPassword: string
  ): boolean {
    return compareSync(reqPassword, actualPassword)
  }
}
