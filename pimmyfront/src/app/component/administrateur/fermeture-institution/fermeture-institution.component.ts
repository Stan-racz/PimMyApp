import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import { MainConfig } from '../../../mainConfig';
import listPlugin from '@fullcalendar/list';
import { DemandeAbs } from '../../utilisateur/demande-conges/DemandeAbs';
// import { AbsenceService } from '../../../absenceService';

@Component({
  selector: 'app-fermeture-institution',
  templateUrl: './fermeture-institution.component.html',
  styleUrls: ['./fermeture-institution.component.scss']
})
export class FermetureInstitutionComponent implements OnInit {

  motifs: any;
  dates: any[] = [];
  debut: any;
  fin: any;
  commentaire: any;
  displayStyle = "none";
  calendar: any;
  conditions = [
    { id: 1, nom: 'Matinée' },
    { id: 2, nom: "Journée entière" },
    { id: 3, nom: "Après-midi" }
  ];
  choixConditionDebut = this.conditions[1].id
  choixConditionFin = this.conditions[1].id
  events: any = []

  constructor(
    // private absenceService: AbsenceService
    private router: Router, private http: HttpClient, private mainConfig: MainConfig
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.http.get("https://calendrier.api.gouv.fr/jours-feries/metropole.json").subscribe(
      (data: any) => {
        for (let element in data) {
          this.events.push({
            title: data[element],
            user: "",
            service: "",
            date: element,
            color: "#babcbd",
            textColor: "#272c33"
          })
        }
      }
    )

    this.http.get<any[]>(this.mainConfig.getApiBaseUrl() + "absences", { headers: this.mainConfig.getHeaders() }).subscribe(
      (res) => {
        this.motifs = res[1]
      }
    );

    this.http.get<DemandeAbs[]>(
      this.mainConfig.getApiBaseUrl() + "demandeAbs/all",
      { headers: this.mainConfig.getHeaders() }
    ).subscribe(
      async (res) => {
        this.calendarOptions.events = [... this.events];


        for (let index = 0; index < res.length; index++) {
          const color = res[index].manager_ok ? res[index].admin_ok && !res[index].refus ? "#272c33" : "orange" : res[index].refus ? "#f85758" : "transparent"
          const textColor = res[index].manager_ok ? res[index].admin_ok ? "#fff" : "#272c33" : res[index].refus ? "#fff" : "#272c33"
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

  ngOnInit(): void {
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
    selectable: true,
    selectOverlap: () => false,
    businessHours: true,
    locale: 'fr',
    firstDay: 1,
    select: this.openPopup.bind(this),
    eventContent: function (arg) {
      return {
        html: arg.event.title + ' <br/>' + arg.event.extendedProps.user
      }
    }
  };

  changeConditionFin(condition: any) {
    this.fin = condition.target.value

  }
  changeConditionDebut(condition: any) {
    this.debut = condition.target.value
  }

  openPopup(selectInfo: DateSelectArg) {
    // Pour afficher dan sla pop up la date de fin
    const newEnd = new Date(selectInfo.end.setDate(selectInfo.end.getDate() - 1))

    this.displayStyle = "block";
    this.debut = selectInfo.startStr;
    this.fin = newEnd;
    this.calendar = selectInfo.view.calendar;
    this.calendar.unselect();
  }

  closePopup(form: NgForm) {
    this.displayStyle = "none";
    this.mainConfig.reloadCurrentRoute();
  }

  onSubmit(form: NgForm) {
    let newFin = new Date(form.value.fin)
    newFin = new Date(newFin.setDate(newFin.getDate() + 1))
    let nb_users

    let data = {
      debut: form.value.debut,
      fin: newFin.toLocaleDateString('fr-CA'),
      commentaire: "Fermeture de l'institution",
      id_absence: this.motifs.id

    }

    this.http.get<any[]>(this.mainConfig.getApiBaseUrl() + "users", { headers: this.mainConfig.getHeaders() }).subscribe(
      (users) => {
        nb_users = users.length
        users.forEach(
          (user) => {
            // console.log("user", user);
            // console.log("demande faite");
            this.demandeAbsence(data, user.id, user.email, users.length)
          }
        )
      }
    );

    this.closePopup(form);
    // }
  }

  openModal() {
    this.displayStyle = "block";
  }

  demandeAbsence(form: any, userId: number, email: string, nb_users: number) {
    // if (this.dates.indexOf(form.debut) !== -1 || this.dates.indexOf(form.fin) !== -1) {
    //   console.log("dates indisponibles");
    // }

    let data = {
      date_deb: form.debut,
      deb_mat: true,
      date_fin: form.fin,
      fin_mat: true,
      commentaire: form.commentaire,
      manager_ok: true,
      admin_ok: false,
      id_absence: form.id_absence,
      user_info: userId,
      email: email,
    }

    this.http.post<DemandeAbs>(this.mainConfig.getApiBaseUrl() + "demandeAbs/create",
      data
      , { headers: this.mainConfig.getHeaders() }).subscribe(
        () => {
          // console.log("acceptation auto");
          this.http.get<DemandeAbs[]>(this.mainConfig.getApiBaseUrl() + "demandeAbs/dernier/" + nb_users,
            { headers: this.mainConfig.getHeaders() }).subscribe(
              elements => {
                // console.log(elements);
                elements.forEach(
                  (element) => {
                    this.acceptanceConges(element)

                  }
                )
              }
            )
        }
      )
  }

  acceptanceConges(absence: any) {
    // console.log("accepetation", id);
    console.log("accepetation", absence);
    let data = {
      "commentaire": absence.DemandeAbsEntity_commentaire,
      "date_deb": absence.DemandeAbsEntity_date_deb,
      "date_fin": absence.DemandeAbsEntity_date_fin,
      "email": absence.DemandeAbsEntity_email,
      "fin_mat": absence.DemandeAbsEntity_fin_mat,
      "id": absence.id,
      "id_absence": absence.DemandeAbsEntity_id_absence,
      "manager_ok": absence.DemandeAbsEntity_manager_ok
    }

    this.http.put<DemandeAbs>(
      this.mainConfig.getApiBaseUrl() + "demandeAbs/validationAdmin",
      {
        data
      },
      { headers: this.mainConfig.getHeaders() }).subscribe()

    // console.log(data);

    this.mainConfig.sleep(300)
    this.mainConfig.reloadCurrentRoute()
  }
}
