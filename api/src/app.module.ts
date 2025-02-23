import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { validationSchema } from './config/validation.schema';
import { OrganizationsModule } from './organization/organization.module';
import { ProjectsModule } from './project/project.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';
        if (isProduction) {
          const username = configService.get('DATABASE_USERNAME');
          const password = configService.get('DATABASE_PASSWORD');
          const host = configService.get('DATABASE_HOST');
          const port = configService.get<number>('DATABASE_PORT');
          const database = configService.get('DATABASE_NAME');
          const poolMode = configService.get('DATABASE_POOL_MODE');
          // Monta a connection string com o pool_mode
          const connectionUrl = `postgres://${username}:${password}@${host}:${port}/${database}?pool_mode=${poolMode}`;
          return {
            type: 'postgres',
            url: connectionUrl,
            autoLoadEntities: true,
            synchronize: true,
          };
        } else {
          return {
            type: 'sqlite',
            database: configService.get('DATABASE_NAME'),
            autoLoadEntities: true,
            synchronize: true,
          };
        }
      },
      inject: [ConfigService],
    }),
    UsersModule,
    OrganizationsModule,
    ProjectsModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
