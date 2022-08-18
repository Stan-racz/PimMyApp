import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/entity/utilisateur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilRepo: Repository<Utilisateur>,
  ) { }

  findAll(): Promise<Utilisateur[]> {
    return this.utilRepo.find();
  }

  async create(nom: string, prenom: string, email: string, civilite: string, nbHeureContractuelle: number, status: string, dateNaiss: string): Promise<void> {
    await this.utilRepo
      .createQueryBuilder()
      .insert()
      .into(Utilisateur)
      .values([{ nom: nom, prenom: prenom, email: email, civilite: civilite, nbHeureContractuelle: nbHeureContractuelle, status: status, dateNaiss: dateNaiss }])
      .execute();
  }
  async remove(id: number): Promise<void> {
    await this.utilRepo.delete(id);
  }
}