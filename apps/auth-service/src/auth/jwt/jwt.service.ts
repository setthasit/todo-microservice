import { Injectable } from '@nestjs/common'
import { JwtService as Jwt } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Auth, AuthClaim, AuthDocument, User, UserDocument } from '@todo-microservices/shared/models'
import { Model } from 'mongoose'

@Injectable()
export class JwtService {
  private readonly jwt: Jwt

  constructor(
    jwt: Jwt,
    @InjectModel(Auth.name) private authRepo: Model<AuthDocument>,
    /*
      TODO: User Repo should not be use in this service
      will need to remove this and store required information in auth collection
    */
    @InjectModel(User.name) private userRepo: Model<UserDocument>
  ) {
    this.jwt = jwt
  }

  public async decode(token: string): Promise<AuthClaim> {
    const claim: any = this.jwt.decode(token)
    return {
      sub: claim.sub,
      email: claim.email,
    }
  }

  public async validateUser(claim: AuthClaim): Promise<UserDocument> {
    return this.userRepo.findOne({ id: claim.sub })
  }

  public generateToken(user: AuthClaim): string {
    const token = this.jwt.sign(user)
    return token
  }

  public async verifyToken(token: string) {
    return this.jwt.verify(token)
  }
}
