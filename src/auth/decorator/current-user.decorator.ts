import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserDocument } from "src/users/models/user.schema";

export const CurrentUser = createParamDecorator(
  (_data:unknown,context:ExecutionContext)=> getCurrentUser(context)
)


const getCurrentUser=(context:ExecutionContext):UserDocument=>{

 return context.switchToHttp().getRequest().user
}