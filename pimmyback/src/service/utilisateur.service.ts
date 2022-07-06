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
  async create(nom: string, prenom: string, email: string, civilite: string, status: string, dateNaiss: string, nbHeureContractuelle: number): Promise<void> {
    await this.utilRepo
    .createQueryBuilder()
    .insert()
    .into(Utilisateur)
    .values([{ nom: "nom", prenom: "prenom", email: "email@mail.com",civilite: "civilite", status: "status", dateNaiss: "00/00/0000",nbHeureContractuelle:1600}])
    .execute();
  }
  async remove(id: number): Promise<void> {
    await this.utilRepo.delete(id);
  }
}