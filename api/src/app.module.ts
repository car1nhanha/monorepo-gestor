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
        return isProduction
          ? {
              type: 'postgres',
              host: configService.get('DATABASE_HOST'),
              port: configService.get<number>('DATABASE_PORT'),
              username: configService.get('DATABASE_USERNAME'),
              password: configService.get('DATABASE_PASSWORD'),
              database: configService.get('DATABASE_NAME'),
              autoLoadEntities: true,
              synchronize: true,
            }
          : {
              type: 'sqlite',
              database: configService.get('DATABASE_NAME'),
              autoLoadEntities: true,
              synchronize: true,
            };
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
