import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable } from 'rxjs';
import { MainConfig } from '../../../mainConfig';
import { Utilisateur } from '../ajout-utilisateur/Utilisateur';

@Component({
  selector: 'app-fiche-utilisateur',
  templateUrl: './fiche-utilisateur.component.html',
  styleUrls: ['./fiche-utilisateur.component.scss']
})
export class FicheUtilisateurComponent implements OnInit {

  dataUser: boolean = false;
  private dataSource = new MatTableDataSource<Utilisateur>();
  constructor(private http: HttpClient, private mainConfig: MainConfig) { }
  // nom: string;
  // prenom: string;
  ngOnInit(): void {

  }

  model = new Utilisateur(18, '', '', '', "", "", "", "",);
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'civilite', 'status', 'dateNaiss', 'nbHeureContractuelle'];



  onUserSearch(form: NgForm) {
    if (form.valid) {
      this.dataUser = true;
    }
  }

  onSubmit(form: NgForm) {

  }

  // thingsAsMatTableDataSource$: Observable<any> = this.getUserData().pipe(
  //   map((serv: any) => {
  //     const dataSource = this.dataSource;
  //     dataSource.data = serv;
  //     return dataSource;
  //   })
  // );

  // getUserData(nom: string, prenom: string) {
  //   return this.http.get<Utilisateur[]>(this.mainConfig.getApiBaseUrl() + 'users', { headers: this.mainConfig.getHeaders() }).pipe(
  //     map((utilisateurs: any[]) => utilisateurs.map(
  //       utilisateur => {
  //         return <Utilisateur>{
  //           nom: utilisateur["nom"],
  //           prenom: utilisateur["prenom"],
  //           email: utilisateur['email'],
  //           civilite: utilisateur['civilite'],
  //           status: utilisateur['status'],
  //           dateNaiss: utilisateur['dateNaiss'],
  //           nombreHeureContractuelle: utilisateur['nombreHeureContractuelle']
  //         }
  //       })
  //     ),
  //   )
  // }

}
