import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import { HttpClient } from '@angular/common/http';
import { MainConfig } from '../../../mainConfig';

@Component({
  selector: 'app-visualisation-absences',
  templateUrl: './visualisation-absences.component.html',
  styleUrls: ['./visualisation-absences.component.scss']
})
export class VisualisationAbsencesComponent implements OnInit {

  dates: any[] = [];
  events: any = []

  constructor(private http: HttpClient, private mainConfig: MainConfig) {

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
    this.getAllDemande()
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
    businessHours: true,
    locale: 'fr',
    firstDay: 1,
    eventContent: function (arg) {
      return {
        html: arg.event.title + ' <br/>' + arg.event.extendedProps.user
      }
    }

  };

  getAllDemande() {
    this.http.get<any[]>(
      this.mainConfig.getApiBaseUrl() + "demandeAbs/service/" + localStorage.getItem("serviceId"),
      { headers: this.mainConfig.getHeaders() }
    ).subscribe(
      async (res) => {
        // console.log(res);

        this.calendarOptions.events = [... this.events];

        for (let index = 0; index < res.length; index++) {
          const color = res[index].manager_ok ? res[index].admin_ok && !res[index].refus ? "#272c33" : "orange" : res[index].refus ? "#f85758" : "transparent"
          const textColor = res[index].manager_ok ? res[index].admin_ok ? "#fff" : "#272c33" : res[index].refus ? "#fff" : "#272c33"
          this.dates.push(res[index].date_deb)
          this.dates.push(res[index].date_fin)
          this.calendarOptions.events.push(
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
        this.calendarOptions.events = Object.assign([], this.calendarOptions.events)
      }
    );
  }
}