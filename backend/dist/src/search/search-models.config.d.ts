import { PrismaService } from 'prisma/prisma.service';
export type SearchHandler = (prisma: PrismaService, query: string) => Promise<any>;
export declare const searchModelMap: Record<string, SearchHandler>;
