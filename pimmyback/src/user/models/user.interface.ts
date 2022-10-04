export interface User {
    id?: number;
    nom?: string;
    prenom?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    civilite?: string;
    status?: string;
    dateNaiss: string;
    nbHeureContractuelle: number;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    MANAGER = 'manager'
}