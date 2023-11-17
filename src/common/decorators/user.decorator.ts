import { ExecutionContext, createParamDecorator } from "@nestjs/common";

const getCurrentUserByContext = (context:ExecutionContext)=> context.switchToHttp().getRequest().user


export const currentUser= createParamDecorator((_data:unknown,context:ExecutionContext)=>getCurrentUserByContext(context))