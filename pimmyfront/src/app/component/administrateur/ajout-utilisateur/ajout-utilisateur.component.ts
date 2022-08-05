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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  civilite = ['Homme', 'Femme'];
  status = ['Cadres', 'Non Cadres Administratif',
    'Non Cadres Vie Scolaire'];

  model = new Utilisateur(18, '', '', '', this.civilite[0], this.status[0], "", "",);

  submitted = false;

  onSubmit(form: NgForm) {
    this.ajoutUtilisateur(form);
    this.submitted = true;
    console.log("prenom : " + form.value.prenom);
    console.log("nom : " + form.value["nom"]);
    console.log(form.value);
  }

  ajoutUtilisateur(form: NgForm) {

    this.http.post<any>('http://localhost:3000/component/ajout-utilisateur', { title: 'Angular POST Request Example' }).subscribe(data => {
      this.model.nom = form.value.nom;
      this.model.prenom = form.value.prenom;
      this.model.email = form.value.email;
      this.model.status = form.value.status;
      this.model.naissance = form.value.naissance;
      this.model.nombreHeureContractuelle = form.value.nombreHeureContractuelle;
    })
  }
}
