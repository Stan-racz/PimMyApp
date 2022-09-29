import { Component, OnInit } from '@angular/core';

import { CalendarOptions, DateSelectArg } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-demande-conges',
  templateUrl: './demande-conges.component.html',
  styleUrls: ['./demande-conges.component.scss']
})
export class DemandeCongesComponent implements OnInit {
  
  motifs = ['Congés payés', 'Congés sans solde', 'RTT'];
  debut: any;
  fin: any;
  displayStyle = "none";
  calendar: any;

  calendarOptions: CalendarOptions = {
    plugins: [listPlugin],
    headerToolbar: {
      left: 'dayGridMonth,listWeek',
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
    events: [
      { title: "Present", date: '2022-09-01', color: "#0000FF" },
      { title: "Absent", date: '2022-09-09', color: "#FF0000" },
      { title: "Absent", date: '2022-09-11', color: "#FF0000" },
    ],
    locale: 'fr',
    firstDay: 1,
    select: this.openPopup.bind(this),
  };

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends
  }

  constructor() { }

  ngOnInit(): void {
  }

  openPopup(selectInfo: DateSelectArg) {
    this.displayStyle = "block";
    this.debut = selectInfo.startStr;
    this.fin = selectInfo.endStr;
    this.calendar = selectInfo.view.calendar;

    this.calendar.unselect();
  }

  closePopup() {
    this.displayStyle = "none";
  }

  onSubmit(form: NgForm) {

    const title = form.value.motif;

    if (form.submitted) {
      this.calendar.addEvent({
        title,
        start: form.value.debut,
        end: form.value.fin,
        allDay: true,
        color: "#FF0000",
      });
      
      form.resetForm();
      this.closePopup();

    }

  }

}
