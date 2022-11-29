import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { Utilisateur } from "./component/administrateur/ajout-utilisateur/Utilisateur";
import { Absences } from "./component/utilisateur/demande-conges/Absences";

@Injectable()
export class MainConfig {

    constructor(
        private router: Router,
        private http: HttpClient,
    ) { }

    private apiBaseUrl: string = 'http://localhost:3000/back-end/';

    /**
     * 
     * Retourne les headers formattés avec le bearer token. Permet d'authentifier l'utilisateur pendant une requête API
     */
    getHeaders() {
        //on récupère le token stocké si l'utilisateur est identifié
        let token = localStorage.getItem('token retourné')
        //on ajoute le token aux headers qui vont servir pour toutes les requêtes http
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
        return headers;
    }

    /**
     * 
     * Retourne la base de l'url vers le back-end
     */
    getApiBaseUrl() {
        return this.apiBaseUrl;
    }

    /**
     * Rafraichis la page pour afficher du nouveau contenu
     */
    reloadCurrentRoute() {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
        });
    }

    /**
     * 
     * @param timeout parameter in millisecond
     */
    sleep(timeout: number) {
        setTimeout(() => { }, timeout)
    }

    redirect(component: string) {
        this.router.navigate([component])
        this.reloadCurrentRoute()
    }

    getMotifsAbsence() {
        return this.http.get<Absences[]>(
            this.getApiBaseUrl() + "absences",
            { headers: this.getHeaders() }
        ).pipe(
            map(
                (absences: any[]) => absences.map(
                    abs => {
                        console.log(abs);
                        return <Absences>{
                            nom: abs["nom"],
                            nbJour: abs["nbJour"],
                        }
                    }
                )
            )
        );
    }

    getUserIdByMail(email: string) {
        return this.http.get<Utilisateur[]>(
            this.apiBaseUrl + "users/email/" + email,
            {
                headers: this.getHeaders(),
            }
        ).pipe(
            map(
                (users: any) => {
                    return users.id
                }
            )
        );
    }

    creationCompteurAbsDispo(userId: number, MotifAbsId: string, nbJourMotif: number) {
        this.http.post(
            this.apiBaseUrl,
        )
    }

    /**
     * 
     * @param email 
     */
    ajoutCompteurAbsUser(email: string) {
        let motifsAbs;
        this.getMotifsAbsence().subscribe(
            (data) => {
                motifsAbs = data
                motifsAbs.forEach(
                    (motif) => {
                        if (motif.nbJour != null) {
                            //TODO ajouter si le nb jour n'est pas null un compteur pour ce motif de congé
                        }
                    }
                )
            });
    }
}