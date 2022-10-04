import { Services } from './services.entity';
import { EntitySchema } from 'typeorm';

export const ServicesSchema = new EntitySchema<Services>
    (
        {
            name: 'Services',
            target: Services,
            columns: {
                id: {
                    type: Number,
                    primary: true,
                    generated: true,
                },
                nom: {
                    type: String,
                },
                manager_Nom: {
                    type: String,
                },

                manager_Prenom: {
                    type: String,
                }
            }
        }
    );