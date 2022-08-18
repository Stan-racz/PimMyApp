import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Utilisateur } from './utilisateur';
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
  }

  ajoutUtilisateur(form: NgForm) {
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
}
