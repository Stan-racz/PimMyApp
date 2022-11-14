import { Services } from "../services/Services";

export class Utilisateur {
    constructor(
        public id: number,
        public nom: string,
        public prenom: string,
        public email: string,
        public civilite: string,
        public status: string,
        public dateNaiss: string,
        public nombreHeureContractuelle: string,
        public id_service: Services,
        public role: string,
    ) { }
}
