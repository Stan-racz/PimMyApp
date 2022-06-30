import { Utilisateur } from 'src/entity/utilisateur.entity';
import { EntitySchema } from 'typeorm';

export const UtilSchema = new EntitySchema<Utilisateur>
    (
        {
            name: 'Utilisateur',
            target: Utilisateur,
            columns: {
                id: {
                    type: Number,
                    primary: true,
                    generated: true,
                },
                nom: {
                    type: String,
                },
                prenom: {
                    type: String,
                },
                email: {
                    type: String,
                },
                civilite: {
                    type: String,
                },
                status: {
                    type: String,
                },
                dateNaiss: {
                    type: String,
                },
                nbHeureContractuelle: {
                    type: Number,
                }
            }
        }
    );