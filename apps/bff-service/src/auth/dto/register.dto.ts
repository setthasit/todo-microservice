import { IsEmail, IsNotEmpty } from "class-validator"

export class RegisterRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string
}

export class RegisterResponse {
  token: string
}
