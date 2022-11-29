import { Abs_dispo } from './absdispo.entity';
import { EntitySchema } from 'typeorm';

export const AbsDispoSchema = new EntitySchema<Abs_dispo>
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
                nbJour: {
                    type: Number,
                }
            }
        }
    );