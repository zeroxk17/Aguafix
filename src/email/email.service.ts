import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envs } from '../config/envs';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.MAILER_HOST,
      port: envs.MAILER_PORT,
      secure: false,
      auth: {
        user: envs.MAILER_USER,
        pass: envs.MAILER_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: envs.MAILER_FROM,
        to,
        subject,
        html,
      });
      this.logger.log(`Correo enviado a: ${to}`);
    } catch (error) {
      this.logger.error(`Error al enviar correo a ${to}`, error);
      throw error;
    }
  }
}
