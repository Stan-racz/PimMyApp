import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MainConfig } from '../../../mainConfig';
import { Absences } from '../../utilisateur/demande-conges/Absences';
import { DemandeAbs } from '../../utilisateur/demande-conges/DemandeAbs';

@Component({
  selector: 'app-visualisation-absences',
  templateUrl: './visualisation-absences.component.html',
  styleUrls: ['./visualisation-absences.component.scss']
})
export class VisualisationAbsencesComponent implements OnInit {

  motifs: any[] = [];
  debut: any;
  fin: any;
  commentaire: any;
  displayStyle = "none";
  calendar: any;

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
    // select: this.openPopup.bind(this),
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private mainConfig: MainConfig
  ) {
    const name = Calendar.name;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.http.get<any[]>(
      this.mainConfig.getApiBaseUrl() + "absences",
      { headers: this.mainConfig.getHeaders() }).subscribe(
        (res) => {
          this.motifs = res
        }
      );
  }

  ngOnInit(): void {
  }

}
