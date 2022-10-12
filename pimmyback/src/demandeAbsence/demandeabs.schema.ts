import { DemandeAbsEntity } from './demandeabs.entity';
import { EntitySchema } from 'typeorm';

export const DemandeAbsSchema = new EntitySchema<DemandeAbsEntity>
    (
        {
            name: 'Demande d\'absence',
            target: DemandeAbsEntity,
            columns: {
                id: {
                    type: Number,
                    primary: true,
                    generated: true,
                },
                date_deb: {
                    type: Date,
                },
                deb_mat: {
                    type: Boolean,
                },
                date_fin: {
                    type: Date,
                },
                fin_mat: {
                    type: Boolean,
                },
                commentaire: {
                    type: String,
                },
                status: {
                    type: String,
                },
                manager_ok: {
                    type: Boolean,
                },
                admin_ok: {
                    type: Boolean,
                }
            }
        }
    );