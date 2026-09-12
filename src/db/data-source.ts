import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Report } from '../reports/entities/report.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5434'),
  database: process.env.DB_NAME ?? 'water_reports_db',
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  entities: [User, Report],
  synchronize: false,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
