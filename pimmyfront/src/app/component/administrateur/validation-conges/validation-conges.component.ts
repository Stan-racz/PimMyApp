import { HttpClient } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Absences } from '../../../component/utilisateur/demande-conges/Absences';
import { DemandeAbs } from '../../../component/utilisateur/demande-conges/DemandeAbs';
import { MainConfig } from '../../../mainConfig';
import { map, Observable } from 'rxjs';
import { Services } from '../services/Services';

@Component({
  selector: 'app-validation-conges',
  templateUrl: './validation-conges.component.html',
  styleUrls: ['./validation-conges.component.scss']
})
export class ValidationCongesComponent implements OnInit {

  displayedColumns: string[] = ["Début de l'absence", "Fin de l'absence", "Demi journée matin", "Demi journée soir", "Commentaire", "Email demandeur", "Motif de l'absence", "Statut du manager", "Décision"];

  private dataSource = new MatTableDataSource<DemandeAbs>();
  motifs: Absences[] = [];
  dates: any[] = [];
  servicesFilter: Services[] = [];
  refreshTab: any[] = []


  constructor(private http: HttpClient, private mainConfig: MainConfig) {

    this.http.get<any[]>(this.mainConfig.getApiBaseUrl() + "services", { headers: this.mainConfig.getHeaders() }).subscribe(
      (res) => {
        this.servicesFilter = res
      }
    );

    this.getAllDemande()
  }

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
    return this.http.get<DemandeAbs[]>(this.mainConfig.getApiBaseUrl() + 'demandeAbs/manager_ok', { headers: this.mainConfig.getHeaders() }).pipe(
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

  acceptanceConges(email: string) {
    this.http.put<DemandeAbs>(this.mainConfig.getApiBaseUrl() + "demandeAbs/validationAdmin", {
      email: email
    }, { headers: this.mainConfig.getHeaders() }).subscribe()
    console.log(email);

    this.mainConfig.sleep(300)
    this.mainConfig.reloadCurrentRoute()
  }

  refusConges() {

  }

  getAllDemande() {
    this.http.get<DemandeAbs[]>(
      this.mainConfig.getApiBaseUrl() + "demandeAbs/manager_ok",
      { headers: this.mainConfig.getHeaders() }
    ).subscribe(
      async (res) => {
        this.calendarOptions.events = [];

        for (let index = 0; index < res.length; index++) {
          const color = res[index].manager_ok ? res[index].admin_ok ? "#272c33" : "orange" : "transparent"
          const textColor = res[index].manager_ok ? res[index].admin_ok ? "#fff" : "#272c33" : "#272c33"
          this.dates.push(res[index].date_deb)
          this.dates.push(res[index].date_fin)
          this.calendarOptions.events.push(
            {
              title: res[index].id_absence.nom,
              user: res[index].user_info.prenom + " " + res[index].user_info.nom,
              start: res[index].date_deb,
              end: res[index].date_fin,
              color: color,
              textColor: textColor,
              borderColor: "#272c33",
            }
          )
        }
        this.calendarOptions.events = Object.assign([], this.calendarOptions.events)
      }
    );
  }

  onChange(newValue: number) {
    if (newValue == 0) {
      this.getAllDemande()
      this.getDemandeConges().subscribe(
        (res) => {
          const dataSource = this.dataSource;
          dataSource.data = this.formatTab(res);

        }
      )
    }
    else {

      this.http.get<any[]>(this.mainConfig.getApiBaseUrl() + 'demandeAbs/service/' + newValue, { headers: this.mainConfig.getHeaders() }).subscribe(
        (res) => {
          this.refreshTab = []

          for (let index = 0; index < res.length; index++) {
            const color = res[index].manager_ok ? res[index].admin_ok ? "#272c33" : "orange" : "transparent"
            const textColor = res[index].manager_ok ? res[index].admin_ok ? "#fff" : "#272c33" : "#272c33"
            this.dates.push(res[index].date_deb)
            this.dates.push(res[index].date_fin)
            this.refreshTab.push(
              {
                title: res[index].abs_nom,
                user: res[index].user_prenom + " " + res[index].user_nom,
                start: res[index].date_deb,
                end: res[index].date_fin,
                color: color,
                textColor: textColor,
                borderColor: "#272c33",
              }
            )
          }

          const dataSource = this.dataSource;
          dataSource.data = this.formatTab(res);

          this.calendarOptions.events = Object.assign([], this.refreshTab)
        }
      );
    }
  }

  formatTab(response: any[]): DemandeAbs[] {
    return response.map(
      resp => {

        return <DemandeAbs>{
          date_deb: resp.date_deb,
          deb_mat: resp.deb_mat,
          date_fin: resp.date_fin,
          fin_mat: resp.fin_mat,
          commentaire: resp.commentaire,
          manager_ok: resp.manager_ok,
          email: resp.email,
          id_absence: resp.id_absence == undefined ? resp.abs_nom : resp.id_absence
        };
      }
    );
  }

  calendarOptions: CalendarOptions = {
    plugins: [listPlugin],
    headerToolbar: {
      left: 'dayGridMonth listMonth',
      center: 'title',
      right: 'prev next today',

    },
    buttonText: {
      today: 'Aujourd\'hui',
      list: 'Liste',
      month: "Mois",
    },
    initialView: 'dayGridMonth',
    weekends: true,
    businessHours: true,
    locale: 'fr',
    firstDay: 1,
    eventContent: function (arg) {
      return {
        html: arg.event.title + ' <br/>' + arg.event.extendedProps.user
      }
    }

  };
}
