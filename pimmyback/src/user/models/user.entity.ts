import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.interface";
import { Services } from '../../services/services.entity';
import { Optional } from "@nestjs/common";
import { DemandeAbsEntity } from "src/demandeAbsence/demandeabs.entity";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column("text")
    nom?: string;

    @Column("text")
    prenom?: string;

    @Column({ unique: true })
    email?: string;

    @Column({ unique: true })
    password?: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role?: UserRole;

    @Column("text")
    civilite?: string;

    @Column("text")
    status?: string;

    @Column("text")
    dateNaiss: string;

    @Column("int")
    nbHeureContractuelle: number;

    //TODO A repenser si on a le temps
    @ManyToOne(() => Services, (service) => service.id)
    id_service: number;

    @OneToMany(() => DemandeAbsEntity, (demande_abs) => demande_abs.email)
    demande_abs_info: DemandeAbsEntity[];
}