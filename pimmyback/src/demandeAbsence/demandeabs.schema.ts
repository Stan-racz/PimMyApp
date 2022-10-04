import { Demande_abs } from './demandeabs.entity';
import { EntitySchema } from 'typeorm';

export const DemandeAbsSchema = new EntitySchema<Demande_abs>
    (
        {
            name: 'Demande d\'absence',
            target: Demande_abs,
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
                }
            }
        }
    );