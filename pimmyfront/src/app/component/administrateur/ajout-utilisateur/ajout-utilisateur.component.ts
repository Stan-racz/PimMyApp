import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Utilisateur } from './Utilisateur';
import { NgForm } from '@angular/forms';

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


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }
  // donnees du formulaire
  civilite = ['Homme', 'Femme'];
  status = ['Cadres', 'Non Cadres Administratif',
    'Non Cadres Vie Scolaire'];
  model = new Utilisateur(18, '', '', '', this.civilite[0], this.status[0], "", "",);
  submitted = false;
  onSubmit(form: NgForm) {
    //si on clique sur le button formulaire :
    this.ajoutUtilisateurManuel(form);
    // sinon on clique sur le button csv
    this.submitted = true;
  }

  //ajout d'utilisateur via le formulaire
  ajoutUtilisateurManuel(form: NgForm) {
    this.http.post<Utilisateur>('http://localhost:3000/utilisateur/ajout', {
      nom: form.value.nom,
      prenom: form.value.prenom,
      email: form.value.email,
      civilite: form.value.civilite,
      status: form.value.status,
      dateNaiss: form.value.dateNaiss,
      nombreHeureContractuelle: form.value.nombreHeureContractuelle,
    }).subscribe(data => {
      console.log(data);
    })
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
      // console.log(">>>>>>>>>>>>>>>>>", tarr);
      // Envoi des donnees contenu dans le fichier au BackEnd
      for (let t = 0; t < tarr.length; t++) {
        this.http.post<Utilisateur>('http://localhost:3000/utilisateur/ajout', {
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