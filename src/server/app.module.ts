import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from '.././common/helper/env.helper';
import path from 'path';
import { TypeOrmConfigService } from '.././shared/typeorm/typeorm.service';
import { TypeOrmModule } from '@nestjs/typeorm';

const dir = path.join(__dirname, '../');
const envFilePath: string = getEnvPath(`${dir}/common/envs`);

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({ dev: process.env.NODE_ENV !== 'production' }),
      {
        viewsDir: null,
      },
    ),
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
