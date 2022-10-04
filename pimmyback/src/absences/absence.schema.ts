import { Absence } from './absence.entity';
import { EntitySchema } from 'typeorm';

export const ServicesSchema = new EntitySchema<Absence>
    (
        {
            name: 'Abscence',
            target: Absence,
            columns: {
                id: {
                    type: Number,
                    primary: true,
                    generated: true,
                },
                nom: {
                    type: String,
                }
            }
        }
    );