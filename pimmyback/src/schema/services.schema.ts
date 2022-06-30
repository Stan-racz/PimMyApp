import { Services } from 'src/entity/services.entity';
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
                manager: {
                    type: String,
                }
            }
        }
    );