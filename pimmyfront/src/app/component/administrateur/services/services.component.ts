import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Services } from './Services';
import { map, Observable, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MainConfig } from '../../../mainConfig';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  status: any;
  services: Services[] = [];
  //colonnes affichées par le tableau 
  displayedColumns: string[] = ['nom', 'nomManagerService', 'prenomManagerService', 'actions'];
  //initialization de la source de données du tableau
  private dataSource = new MatTableDataSource<Services>();
  model = new Services(18, '', '', '',);


  constructor(private http: HttpClient, private mainConfig: MainConfig) { }



  onSubmit(form: NgForm) {
    //si le formulaire est valide (les trois champs required remplis) alors je lance le call api avec mon service
    if (form.valid) {
      this.ajoutService(form);
    }
  }

  //call api POST pour envoyer le service à la BDD
  ajoutService(form: NgForm) {
    console.log(form.value)
    //un post se constitue de : 'url', {body}, {headers} puis un subscribe si on a besoin d'interpreter le retour api
    this.http.post(this.mainConfig.getApiBaseUrl() + 'services', { nomService: form.value.Nom, nomManagerService: form.value.nomManagerService, prenomManagerService: form.value.prenomManagerService }, { headers: this.mainConfig.getHeaders() }).subscribe(data => { console.log(data) });
    //rafraichissement de la page pour afficher les nouvelles données
    this.mainConfig.reloadCurrentRoute();
  }

  //transformation des données du call api en tableau mat table data source
  thingsAsMatTableDataSource$: Observable<any> = this.getServicesData().pipe(
    map((serv: any) => {
      const dataSource = this.dataSource;
      dataSource.data = serv;
      return dataSource;
    })
  );

  ngOnInit(): void {
  }


  suppressionService(row: any) {
    //on ajoute le service à la fin de la requête DELETE avec row['nom'] qui récupère les données de la rangée selon le bouton cliqué
    this.http.delete<Services>(this.mainConfig.getApiBaseUrl() + 'services/' + row['nom'], { headers: this.mainConfig.getHeaders() }).subscribe(() => this.status = 'Delete successful');
    this.mainConfig.reloadCurrentRoute();
  }
  //récupération des données via requête get à l'api puis formatage de la map en tableau lisible pour notre tableau
  getServicesData() {
    return this.http.get<Services[]>(this.mainConfig.getApiBaseUrl() + 'services', { headers: this.mainConfig.getHeaders() }).pipe(
      map((services: any[]) => services.map(
        service => {
          return <Services>{
            nom: service["nom"],
            nomManagerService: service["manager_Nom"],
            prenomManagerService: service['manager_Prenom']
          }
        })
      ),
    )
  }

}
