import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Absences } from '../../../component/utilisateur/demande-conges/Absences';
import { DemandeAbs } from '../../../component/utilisateur/demande-conges/DemandeAbs';
import { MainConfig } from '../../../mainConfig';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-validation-conges-manager',
  templateUrl: './validation-conges-manager.component.html',
  styleUrls: ['./validation-conges-manager.component.scss']
})
export class ValidationCongesManagerComponent implements OnInit {

  displayedColumns: string[] = ["Début de l'absence", "Fin de l'absence", "Demi journée matin", "Demi journée soir", "Commentaire", "Email demandeur", "Motif de l'absence", "Statut", "Décision"];

  private dataSource = new MatTableDataSource<DemandeAbs>();
  motifs: Absences[] = [];


  constructor(private http: HttpClient, private mainConfig: MainConfig) { }

  ngOnInit(): void {
  }


  thingsAsMatTableDataSource$: Observable<any> = this.getDemandeConges().pipe(
    map((serv: any) => {
      const dataSource = this.dataSource;
      dataSource.data = serv;
      return dataSource;
    })
  );


  getDemandeConges() {
    return this.http.get<DemandeAbs[]>(this.mainConfig.getApiBaseUrl() + 'demandeAbs/absManager', { headers: this.mainConfig.getHeaders() }).pipe(
      map((demandeAbsences: any[]) => demandeAbsences.map(
        demandeAbsence => {
          return <DemandeAbs>{
            date_deb: demandeAbsence.date_deb,
            deb_mat: demandeAbsence.deb_mat,
            date_fin: demandeAbsence.date_fin,
            fin_mat: demandeAbsence.fin_mat,
            commentaire: demandeAbsence.commentaire,
            manager_ok: demandeAbsence.manager_ok,
            email: demandeAbsence.email,
            id_absence: demandeAbsence.id_absence.nom,
          }
        })
      ),
    )
  }

  getAbsences() {
    return this.http.get<Absences[]>(this.mainConfig.getApiBaseUrl() + "absence", { headers: this.mainConfig.getHeaders() }).subscribe(
      {
        next: data => {
          this.motifs = data
        }
      }
    );
  }

  acceptanceConges(email: string) {

    this.http.put<DemandeAbs>(this.mainConfig.getApiBaseUrl() + "demandeAbs/validationManager", {
      email: email
    }, { headers: this.mainConfig.getHeaders() }).subscribe()
    console.log(email);

    setTimeout(() => { }, 300)
    this.mainConfig.reloadCurrentRoute()
  }

  refusConges() {

  }
}
