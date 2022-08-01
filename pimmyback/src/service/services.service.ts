import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from 'src/entity/services.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private utilServ: Repository<Services>,
  ) {}

  findAll(): Promise<Services[]> {
    return this.utilServ.find();
  }

  async remove(id: number): Promise<void> {
    await this.utilServ.delete(id);
  }
}