import { Abs_dispo } from 'src/entity/absdispo.entity';
import { EntitySchema } from 'typeorm';

export const ServicesSchema = new EntitySchema<Abs_dispo>
    (
        {
            name: 'Abscences Disponibles',
            target: Abs_dispo,
            columns: {
                id: {
                    type: Number,
                    primary: true,
                    generated: true,
                },
                compteur: {
                    type: Number,
                }
            }
        }
    );