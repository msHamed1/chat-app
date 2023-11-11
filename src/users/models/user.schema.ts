import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema(
  {
    versionKey: false
  }
)
export class UserDocument extends Document {

  @Prop({
    required: true,
    type: Types.ObjectId
  })
  _id: Types.ObjectId;

  @Prop(
    {
      required: true
    }
  )
  email: string

  @Prop(
    {
      required: true
    }
  )
  password: string

}

export const UserSchema = SchemaFactory.createForClass(UserDocument)