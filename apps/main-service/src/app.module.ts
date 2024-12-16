import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { DomainModule } from './domain/domain.module';
import { SerializeInterceptor } from './interceptor/serialize.interceptor';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './domain/auth/auth.module';
import { AuthGuard } from './domain/auth/guard/auth.guard';

@Module({
    imports: [DatabaseModule, DomainModule, AuthModule],
    controllers: [],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: SerializeInterceptor,
    }, {
        provide: APP_GUARD,
        useClass: AuthGuard,
    }],
})
export class AppModule { }