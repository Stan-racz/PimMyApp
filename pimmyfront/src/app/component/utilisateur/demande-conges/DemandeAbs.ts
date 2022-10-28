import { Absences } from "./Absences";

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
    ) { }
}