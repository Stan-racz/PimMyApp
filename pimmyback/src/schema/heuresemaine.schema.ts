import { HeuresSemaine } from 'src/entity/heuressemaine.entity';
import { EntitySchema } from 'typeorm';

export const ServicesSchema = new EntitySchema<HeuresSemaine>
    (
        {
            name: 'Heures semaine',
            target: HeuresSemaine,
            columns: {
                id: {
                    type: Number,
                    primary: true,
                    generated: true,
                },
                nbHeures: {
                    type: Number,
                },
                dateSemaine: {
                    type: Number,
                }
            }
        }
    );