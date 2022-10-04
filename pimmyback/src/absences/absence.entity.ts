import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("absence")
export class Absence {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("text")
  nom: string; 
  
}