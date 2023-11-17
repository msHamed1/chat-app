import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema(
  {
    versionKey: false
  }
)
export class UserDocument extends Document {

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId
  })
  _id: Types.ObjectId;

  @Prop(
    {
      required: true,
      unique: true
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