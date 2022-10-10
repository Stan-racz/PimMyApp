import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class MainConfig {

    constructor(private router: Router) { }

    private apiBaseUrl: string = 'http://localhost:3000/back-end/';

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

    getApiBaseUrl() {
        return this.apiBaseUrl;
    }

    //méthode qui permet de rafraichir la page pour actualiser du contenu
    reloadCurrentRoute() {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
        });
    }
}