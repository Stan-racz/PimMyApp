import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class MainConfig {

    constructor(private router: Router) { }

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
}