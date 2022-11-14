import { AbsDispoController } from 'src/absdispo/absdispo.controller';
import { Abs_dispo } from 'src/absdispo/absdispo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DemandeAbsEntity } from '../demandeAbsence/demandeabs.entity';


@Entity("absence")
export class Absence {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("text")
  nom: string;

  @OneToMany(() => DemandeAbsEntity, (demandeAbs) => demandeAbs.id_absence)
  demandeAbs: DemandeAbsEntity[]

  @OneToMany(() => Abs_dispo, (absDispo) => absDispo.id_abs)
  absDispo: Abs_dispo[]
}