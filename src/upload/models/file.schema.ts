import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema(
  {
    versionKey: false
  }
)
export class FileDocument extends Document {
  @Prop(
    {
      required: true,
      type: Types.ObjectId
    }
  )
  _id: Types.ObjectId 


  @Prop({
    required: true,
    type:{}
  })
  createdBy :{
    userEmail:string,
    userId:Types.ObjectId 
  }


  @Prop({
    required: true,
  })
  path :string
}
export const FileSchema = SchemaFactory.createForClass(FileDocument)