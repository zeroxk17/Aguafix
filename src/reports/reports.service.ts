import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dtos/CreateReportDto';
import { EmailService } from '../email/email.service';
import { generateReportTemplate } from './templates/report.template';
import { envs } from '../config/envs';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    private readonly emailService: EmailService,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const report = this.reportRepository.create(createReportDto);
    const saved = await this.reportRepository.save(report);

    const html = generateReportTemplate(createReportDto);
    await this.emailService.sendEmail(
      envs.MAINTENANCE_EMAIL,
      `[Fuga de Agua] Nuevo reporte - Severidad: ${createReportDto.severity.toUpperCase()}`,
      html,
    );

    return saved;
  }

  async findAll(): Promise<Report[]> {
    return this.reportRepository.find({ order: { createdAt: 'DESC' } });
  }
}
