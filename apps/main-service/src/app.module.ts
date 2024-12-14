import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { DomainModule } from './domain/domain.module';
import { SerializeInterceptor } from './interceptor/serialize.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
    imports: [DatabaseModule, DomainModule],
    controllers: [],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: SerializeInterceptor,
    }],
})
export class AppModule { }