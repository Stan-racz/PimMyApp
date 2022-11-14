import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Utilisateur } from './Utilisateur';
import { NgForm } from '@angular/forms';
import { MainConfig } from '../../../mainConfig';
import { async, map, Observable } from 'rxjs';
import { Services } from '../services/Services';
import { Absences } from '../../utilisateur/demande-conges/Absences';
const password = require('secure-random-password');
@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.scss']
})
export class AjoutUtilisateurComponent implements OnInit {
  postId: any;
  file: any;
  dataformat: any;
  fileReaded: any;
  private dataSource: any;

  constructor(private http: HttpClient, private mainConfig: MainConfig) {
  }

  ngOnInit(): void {
    // this.datasource = this.getServices();
  }

  thingsAsMatTableDataSource$: Observable<any> = this.getServices().pipe(
    map((serv: any) => {
      const dataSource = this.dataSource;
      dataSource.data = serv;
      return dataSource;
    })
  );


  // donnees du formulaire
  civilite = ['Homme', 'Femme'];
  status = ['Cadres', 'Non Cadres Administratif', 'Non Cadres Vie Scolaire'];
  roles = ['user', 'manager', 'admin'];
  model = new Utilisateur(18, '', '', '', this.civilite[0], this.status[0], "", "", { id: 1, nom: "", nomManagerService: "", prenomManagerService: "" }, "");
  submitted = false;
  services: Services[] = [];
  onSubmit(form: NgForm) {
    //si on clique sur le button formulaire :
    this.ajoutUtilisateurManuel(form);
    // sinon on clique sur le button csv
    this.submitted = true;
  }

  getServices() {
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

  //ajout d'utilisateur via le formulaire
  ajoutUtilisateurManuel(form: NgForm) {

    let mdp = password.randomPassword()
    // console.log(form.value);
    let userId;
    let absences;
    let found;
    let id_absences;
    this.http.post<Utilisateur>(this.mainConfig.getApiBaseUrl() + 'users', {
      nom: form.value.nom,
      prenom: form.value.prenom,
      email: form.value.email,
      password: mdp,
      role: form.value.role,
      civilite: form.value.civilite,
      status: form.value.status,
      dateNaiss: form.value.dateNaiss,
      nbHeureContractuelle: Number(form.value.nombreHeureContractuelle),
      //trouver pourquoi ça s'ajoute pas dans la bdd - (est ce que je reçois le 1 dans le back? si oui alors c'est le formattage de la requete la bas)
      id_service: 1,
    }).subscribe(data => {
      console.log(data);
      userId = data.id
    })

    this.mainConfig.sleep(300)
    absences = this.http.get<Absences[]>(this.mainConfig.getApiBaseUrl() + "absences", { headers: this.mainConfig.getHeaders() }).pipe(map(
      (absences) => absences.map(
        absence => {
          // console.log("yo", absence);

          return <Absences>{
            id: absence.id,
            nom: absence.nom
          }
        }
      )
    ))
    this.mainConfig.sleep(300)
    // console.log("absneces :) ", absences);

    // found = absences.forEach((absence) => {
    //   if (absence[0].nom == "Congés Payés") {
    //     id_absences = absence[0].id
    //   }
    // })

    // this.http.post<any>(this.mainConfig.getApiBaseUrl() + "absDispo", {
    //   status: form.value.status,
    //   id_util: userId,
    //   id_abs: id_absences,
    // }, { headers: this.mainConfig.getHeaders() })
  }

  // Ajout d'utilisateur via CSV (upload du fichier + traitement)
  fileChanged(e: any) {
    // Recuperation du fichier
    this.fileReaded = e.target.files[0];
    let reader: FileReader = new FileReader();
    // Lecture du fichier
    reader.readAsText(this.fileReaded);
    // Nettoyage du fichier
    reader.onload = (e) => {
      let csv: string = reader.result as string;
      // Decoupage du fichier en ligne puis en tableau
      let allTextLines = csv.split(/\r|\n|\r/);
      let headers = allTextLines[0].split(',');
      let lines = [];
      let cases = [];
      let tarr = [];

      // Formattage du fichier
      for (let i = 0; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(',');
        if (data.length === headers.length) {
          for (let j = 0; j < headers.length; j++) {
            if (data[j] != "") {
              cases = data[j].split(';');
              tarr.push(cases);
              lines.push(tarr);
            }
          }
        }
      }
      // Envoi des donnees contenu dans le fichier au BackEnd
      for (let t = 0; t < tarr.length; t++) {
        this.http.post<Utilisateur>(this.mainConfig.getApiBaseUrl() + 'utilisateur/ajout', {
          nom: tarr[t][0],
          prenom: tarr[t][1],
          email: tarr[t][2],
          civilite: tarr[t][3],
          status: tarr[t][4],
          dateNaiss: tarr[t][5],
          nombreHeureContractuelle: tarr[t][6],
        }).subscribe(data => {
          console.log(data);
        })
      }
    }
  }
}