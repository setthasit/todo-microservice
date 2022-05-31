import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type AuthDocument = Auth & Document

@Schema({ timestamps: true })
export class Auth {
    @Prop({ required: true, index: true })
    token: string

    @Prop({ required: true, index: true })
    userId: string
}

export const AuthSchema = SchemaFactory.createForClass(Auth)
