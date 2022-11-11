import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MainConfig } from '../../../mainConfig';
import { Absences } from './Absences';
import { DemandeAbs } from './DemandeAbs';

@Component({
  selector: 'app-demande-conges',
  templateUrl: './demande-conges.component.html',
  styleUrls: ['./demande-conges.component.scss']
})
export class DemandeCongesComponent implements OnInit {

  motifs: any[] = [];
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


  calendarOptions: CalendarOptions = {
    plugins: [listPlugin],
    headerToolbar: {
      left: 'dayGridMonth list',
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
    editable: true,
    selectable: true,
    businessHours: true,
    locale: 'fr',
    firstDay: 1,
    select: this.openPopup.bind(this),
  };

  constructor(private router: Router, private http: HttpClient, private mainConfig: MainConfig) {
    const name = Calendar.name;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.http.get<any[]>(this.mainConfig.getApiBaseUrl() + "absences", { headers: this.mainConfig.getHeaders() }).subscribe((res) => {
      this.motifs = res
    });

    this.http.get<DemandeAbs[]>(
      this.mainConfig.getApiBaseUrl() + "demandeAbs/" + localStorage.getItem('userEmail'), { headers: this.mainConfig.getHeaders() }).subscribe(async (res) => {
        this.calendarOptions.events = [];

        for (let index = 0; index < res.length; index++) {
          const color = res[index].manager_ok ? res[index].admin_ok ? "#272c33" : "orange" : "transparent"
          const textColor = res[index].manager_ok ? res[index].admin_ok ? "#fff" : "#272c33" : "#272c33"

          this.calendarOptions.events.push({
            title: res[index].id_absence.nom,
            start: res[index].date_deb,
            end: res[index].date_fin,
            color: color,
            textColor: textColor,
            borderColor: "#272c33"
          })
        }
      });
  }

  ngOnInit() {
  }

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
    this.reloadCurrentRoute();
  }

  onSubmit(form: NgForm) {
    // A modifier : pour les demi journée
    if (form.submitted) {
      let newFin = new Date(form.value.fin)
      newFin = new Date(newFin.setDate(newFin.getDate() + 1))

      if (form.value.debut === form.value.fin) {
        switch (form.value.choixConditionDebut) {

          //TODO a discuter : rajouter une condition : si les deux dates sont différentes alors le choix est uniquement journée entières (= plus de drop down mais un choix en dur)
          case 1:
            form.value.fin += "T12:00:00"
            form.value.choixConditionDebut = true
            form.value.choixConditionFin = false
            break;

          case 3:
            form.value.debut += "T13:00:00"
            form.value.fin = newFin.toLocaleDateString('fr-CA')
            form.value.choixConditionDebut = false
            form.value.choixConditionFin = true
            break;

          default:
            form.value.choixConditionDebut = true
            form.value.choixConditionFin = true
            form.value.fin = newFin.toLocaleDateString('fr-CA')
            break;
        }
      }
      else {
        if (form.value.choixConditionDebut === 1 && form.value.choixConditionFin === 1) {
          form.value.fin += "T12:00:00"
          form.value.choixConditionDebut = true
          form.value.choixConditionFin = false
        }
        else if (form.value.choixConditionDebut === 3 && form.value.choixConditionFin === 1) {
          form.value.debut += "T13:00:00"
          form.value.fin += "T12:00:00"
          form.value.choixConditionDebut = false
          form.value.choixConditionFin = false
        }
        else if (form.value.choixConditionDebut === 3 && form.value.choixConditionFin === 3) {
          form.value.debut += "T13:00:00"
          form.value.fin = newFin.toLocaleDateString('fr-CA')
          form.value.choixConditionDebut = false
          form.value.choixConditionFin = true
        }
        else if (form.value.choixConditionDebut === 1 && form.value.choixConditionFin === 3) {
          form.value.debut += "T13:00:00"
          form.value.fin = newFin.toLocaleDateString('fr-CA')
          form.value.choixConditionDebut = false
          form.value.choixConditionFin = true

        }
        else {
          form.value.choixConditionDebut = true
          form.value.choixConditionFin = true
          form.value.fin = newFin.toLocaleDateString('fr-CA')
        }
      }
      this.demandeAbsence(form);
      this.closePopup(form);
    }
  }

  openModal() {
    this.displayStyle = "block";
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  demandeAbsence(form: NgForm) {
    this.http.post<DemandeAbs>(this.mainConfig.getApiBaseUrl() + "demandeAbs/create", {
      date_deb: form.value.debut,
      deb_mat: form.value.choixConditionDebut,
      date_fin: form.value.fin,
      fin_mat: form.value.choixConditionFin,
      commentaire: form.value.commentaire,
      manager_ok: false,
      admin_ok: false,
      id_absence: form.value.motif,
      email: localStorage.getItem('userEmail'),
    }, { headers: this.mainConfig.getHeaders() }).subscribe()
  }
}