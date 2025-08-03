"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:8080', 'http://192.168.0.110:8080', ' https://c95de2aa99b2.ngrok-free.app'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.use('/payments/webhook', (req, res, next) => {
        if (req.method === 'POST') {
            const data = [];
            req.on('data', (chunk) => data.push(chunk));
            req.on('end', () => {
                req.rawBody = Buffer.concat(data);
                next();
            });
        }
        else {
            next();
        }
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map