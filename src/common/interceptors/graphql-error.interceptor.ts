import {
    Catch,
    ArgumentsHost,
    HttpException,
    BadRequestException,
  } from '@nestjs/common';
  import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class GraphQLErrorFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    
    if (exception instanceof BadRequestException) {
      const response: any = exception.getResponse();
      const message = Array.isArray(response.message)
        ? response.message.join(', ')
        : response.message;
      
      return new Error(message);
    }

    if (exception instanceof HttpException) {
      return new Error(exception.message);
    }

    return new Error(exception.message || 'Internal server error');
  }
}