import { ConfigService } from '@nestjs/config';
import handlebars from 'handlebars';
import { promises as fs } from 'node:fs';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

interface EmailOptions {
  to: string;
  subject: string;
  templateName: string;
  replacements: Record<string, any>;
}

export class EmailService {
  private static transporter: nodemailer.Transporter;

  private static getConfigService(): ConfigService {
    return new ConfigService();
  }

  private static getTransporter(): nodemailer.Transporter {
    if (!this.transporter) {
      const configService = this.getConfigService();
      const mailHost = configService.get<string>('MAIL_HOST');
      const mailPort = Number(configService.get<number>('MAIL_PORT'));
      const mailUser = configService.get<string>('MAIL_USER');
      const mailPass = configService.get<string>('MAIL_PASS');

      const transportOptions: nodemailer.TransportOptions = {
        host: mailHost,
        port: mailPort,
        secure: false,
        auth: {
          user: mailUser,
          pass: mailPass,
        },
      };

      this.transporter = nodemailer.createTransport(transportOptions);
    }
    return this.transporter;
  }

  private static async loadTemplate(
    templateName: string,
    replacements: Record<string, any>,
  ): Promise<string> {
    const templatePath = path.join(
      __dirname,
      '../../template',
      `${templateName}.html`,
    );
    const templateFile = await fs.readFile(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(templateFile);
    return compiledTemplate(replacements);
  }

  public static async sendEmail({
    to,
    subject,
    templateName,
    replacements,
  }: EmailOptions): Promise<any> {
    try {
      const htmlContent = await this.loadTemplate(templateName, replacements);
      const configService = this.getConfigService();
      const mailOptions = {
        from: configService.get<string>('MAIL_USER'),
        to,
        subject,
        html: htmlContent,
      };

      const info = await this.getTransporter().sendMail(mailOptions);
      console.log(`E-mail enviado para: ${info.envelope.from}`);
      return info;
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw error;
    }
  }
}
