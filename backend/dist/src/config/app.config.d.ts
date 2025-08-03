import { ConfigService } from '@nestjs/config';
export declare class AppConfig {
    private configService;
    constructor(configService: ConfigService);
    get frontendUrl(): string;
}
