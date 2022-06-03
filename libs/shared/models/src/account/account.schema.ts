import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true, minimize: false })
export class User {
    @Prop({ required: true, index: true })
    email: string

    @Prop({ required: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
