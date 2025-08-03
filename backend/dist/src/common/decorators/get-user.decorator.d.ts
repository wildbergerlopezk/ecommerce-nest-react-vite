export declare const GetUser: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | keyof Express.User | undefined)[]) => ParameterDecorator;
declare global {
    namespace Express {
        interface User {
            userId: string;
            email: string;
            role: string;
        }
    }
}
