import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { main } from '@popperjs/core';
import { map, Observable, tap } from 'rxjs';
import { MainConfig } from '../../../mainConfig';
import { Utilisateur } from '../ajout-utilisateur/Utilisateur';

@Component({
  selector: 'app-fiche-utilisateur',
  templateUrl: './fiche-utilisateur.component.html',
  styleUrls: ['./fiche-utilisateur.component.scss']
})
export class FicheUtilisateurComponent implements OnInit {

  users: string[] = [""];

  // private dataSource = new MatTableDataSource<Utilisateur>();
  dataSource = new MatTableDataSource<any>(this.users);
  constructor(
    private http: HttpClient,
    private mainConfig: MainConfig,
    private ref: ChangeDetectorRef
  ) { }
  ngOnInit(): void {

  }

  model = new Utilisateur(18, '', '', '', "", "", "", "", { id: 1, nom: "", nomManagerService: "", prenomManagerService: "" }, ""); displayedColumns: string[] = ['nom', 'prenom', 'dateNaiss', 'email', 'conges', 'nbHeureContrat'];

  onUserSearch(form: NgForm) {
    this.getUserData(form.value.Nom, form.value.Prenom).subscribe(data => {
      // this.users = data
      console.log("yolo", this.users);
    }
    )
    // this.mainConfig.sleep(1000)
    // setTimeout(() => { }, 10000)
    console.log(this.users);

    this.dataSource = new MatTableDataSource(this.users);
    // this.dataSource = new MatTableDataSource(this.feedsOverviewData);
  }

  getUserData(nom: string, prenom: string) {
    return this.http.get<Utilisateur[]>(
      this.mainConfig.getApiBaseUrl() + 'users/' + nom + "/" + prenom,
      {
        headers: this.mainConfig.getHeaders()
      })
  }

}

