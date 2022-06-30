import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/entity/utilisateur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilRepo: Repository<Utilisateur>,
  ) {}

  findAll(): Promise<Utilisateur[]> {
    return this.utilRepo.find();
  }

//   findOne(id: number): Promise<Utilisateur> {
//     return this.utilRepo.findOne(id);
//   }

  async remove(id: number): Promise<void> {
    await this.utilRepo.delete(id);
  }
}