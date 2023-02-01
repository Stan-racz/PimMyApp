import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { main } from '@popperjs/core';
import { map, Observable, tap } from 'rxjs';
import { MainConfig } from '../../../mainConfig';
import { Utilisateur } from '../ajout-utilisateur/Utilisateur';
import { Services } from '../services/Services';

@Component({
  selector: 'app-fiche-utilisateur',
  templateUrl: './fiche-utilisateur.component.html',
  styleUrls: ['./fiche-utilisateur.component.scss']
})
export class FicheUtilisateurComponent implements OnInit {

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  users: Utilisateur[] = [];
  // private dataSource = new MatTableDataSource<Utilisateur>();
  dataSource = new MatTableDataSource<any>();

  constructor(
    private http: HttpClient,
    private mainConfig: MainConfig,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  model = new Utilisateur(18, '', '', '', "", "", "", "", { id: 1, nom: "", nomManagerService: "", prenomManagerService: "" }, "");
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'service', 'role', 'nbHeureContrat'];

  onUserSearch(form: NgForm) {
    this.getUserData(form.value.nom, form.value.prenom).subscribe(data => {
      this.users[0] = data;
      // console.log("users", this.users);
      this.dataSource.data = this.users
    }
    );
    // console.log("patate de forain", this.users);
    // this.dataSource = new MatTableDataSource(this.users);
    // this.dataSource = new MatTableDataSource(this.feedsOverviewData);
  }

  reload() {
    this.mainConfig.reloadCurrentRoute();
  }

  getUserData(nom: string, prenom: string) {
    return this.http.get<Utilisateur>(
      this.mainConfig.getApiBaseUrl() + 'users/' + nom + "/" + prenom,
      { headers: this.mainConfig.getHeaders() }
    )
  }

  // getUserData(nom: string, prenom: string) {
  //   return this.http.get<Utilisateur[]>(
  //     this.mainConfig.getApiBaseUrl() + 'users/' + nom + "/" + prenom,
  //     {
  //       headers: this.mainConfig.getHeaders()
  //     }
  //   ).pipe(
  //     map(
  //       (services: any[]) => services.map(
  //         service => {
  //           return <any>{
  //             nom: service["nom"],
  //             nomManagerService: service["prenom"],
  //             prenomManagerService: service['email']
  //           }
  //         }
  //       )
  //     ),
  //   )
  // }
}

