export class Utilisateur {
    constructor(
        public id: number,
        public nom: string,
        public prenom: string,
        public email: string,
        public civilite: string,
        public status: string,
        public naissance: string,
        public nombreHeureContractuelle: string,

    ) { }
}
