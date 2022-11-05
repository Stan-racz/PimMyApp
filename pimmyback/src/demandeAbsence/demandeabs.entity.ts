import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BeforeInsert, ManyToOne } from 'typeorm';
import { Absence } from '../absences/absence.entity';
import { UserEntity } from '../user/models/user.entity';

@Entity("DemandeAbsEntity")
export class DemandeAbsEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;


  @Column("date")
  date_deb: Date;
  //Renommer en matinée
  @Column("bool")
  deb_mat: boolean;

  @Column("date")
  date_fin: Date;
  //renommer en aprem si les deux sont a vrai alors journée entière
  @Column("bool")
  fin_mat: boolean;

  @Column("text")
  commentaire: string;

  @Column("bool")
  manager_ok: boolean;

  @Column("bool")
  admin_ok: boolean;

  @Column("text")
  email: string;

  @Column("bool")
  refus: boolean;

  @ManyToOne(() => Absence, (absence) => absence.id)
  id_absence: Absence;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}