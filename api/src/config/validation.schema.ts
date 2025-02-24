import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(3000),
  APP_URL: Joi.string().uri().required(),

  // Configuração do banco de dados para produção
  DATABASE_HOST: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  DATABASE_PORT: Joi.number().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  DATABASE_USERNAME: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  DATABASE_PASSWORD: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  DATABASE_NAME: Joi.string().required(),

  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().required(),
  MAIL_USER: Joi.string().required(),
  MAIL_SENDER: Joi.string().required(),
  MAIL_PASS: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  OPENCAGE_API_KEY: Joi.string().required(),
  APP_NAME: Joi.string().required(),
  CORS_ORIGIN: Joi.string().required(),
});
