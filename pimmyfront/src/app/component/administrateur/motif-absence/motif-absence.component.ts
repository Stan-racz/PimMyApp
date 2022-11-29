import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MainConfig } from '../../../mainConfig';
import { Absences } from './Absences';
@Component({
  selector: 'app-motif-absence',
  templateUrl: './motif-absence.component.html',
  styleUrls: ['./motif-absence.component.scss']
})
export class MotifAbsenceComponent implements OnInit {

  status: any;
  services: Absences[] = [];
  //colonnes affichées par le tableau 
  displayedColumns: string[] = ['nom', 'actions'];
  //initialization de la source de données du tableau
  private dataSource = new MatTableDataSource<Absences>();
  model = new Absences(1, '',);
  // absId: number = -1;

  constructor(private http: HttpClient, private mainConfig: MainConfig) { }



  onSubmit(form: NgForm) {
    //si le formulaire est valide (les trois champs required remplis) alors je lance le call api avec mon service
    if (form.valid) {
      this.ajoutAbsence(form);
    }
  }

  //call api POST pour envoyer le service à la BDD
  ajoutAbsence(form: NgForm) {
    console.log(form.value)
    //un post se constitue de : 'url', {body}, {headers} puis un subscribe si on a besoin d'interpreter le retour api
    this.http.post(
      this.mainConfig.getApiBaseUrl() + 'absences',
      { nom: form.value.Nom, },
      { headers: this.mainConfig.getHeaders() }).subscribe(data => { console.log(data) }
      );
    //rafraichissement de la page pour afficher les nouvelles données
    this.mainConfig.reloadCurrentRoute();
  }

  //transformation des données du call api en tableau mat table data source
  thingsAsMatTableDataSource$: Observable<any> = this.getAbsencesData().pipe(
    map((abs: any) => {
      const dataSource = this.dataSource;
      dataSource.data = abs;
      return dataSource;
    })
  );

  ngOnInit(): void {
  }


  suppressionAbsence(row: any) {
    console.log(row["nom"]);

    this.getAbsencesData().subscribe(data => {
      let absId = data.findIndex(x => x.nom === row["nom"])
      this.http.delete<Absences>(this.mainConfig.getApiBaseUrl() + 'absences/' + absId, { headers: this.mainConfig.getHeaders() }).subscribe(() => this.status = 'Delete successful');
      this.mainConfig.reloadCurrentRoute();
    });
    //on ajoute le service à la fin de la requête DELETE avec row['nom'] qui récupère les données de la rangée selon le bouton cliqué

  }

  //récupération des données via requête get à l'api puis formatage de la map en tableau lisible pour notre tableau
  getAbsencesData() {
    return this.http.get<Absences[]>(
      this.mainConfig.getApiBaseUrl() + 'absences',
      { headers: this.mainConfig.getHeaders() }
    ).pipe(
      map(
        (absences: any[]) => absences.map(
          absence => {
            return <Absences>{
              nom: absence["nom"],
            }
          }
        )
      ),
    )
  }


}
