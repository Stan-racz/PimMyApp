import { Absences } from "./Absences";
import { Utilisateur } from "../../administrateur/ajout-utilisateur/Utilisateur";
export class DemandeAbs {
    constructor(
        public id: number,
        public date_deb: Date,
        public deb_mat: boolean,
        public date_fin: Date,
        public fin_mat: boolean,
        public commentaire: string,
        public manager_ok: boolean,
        public admin_ok: boolean,
        public email: string,
        public id_absence: Absences,
        public user_info: Utilisateur,
    ) { }
}