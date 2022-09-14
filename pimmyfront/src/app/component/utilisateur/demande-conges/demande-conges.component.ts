import { Component, OnInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-demande-conges',
  templateUrl: './demande-conges.component.html',
  styleUrls: ['./demande-conges.component.scss']
})
export class DemandeCongesComponent implements OnInit {
  events: any = [
    {title: "Present", date: '2022-09-01', color: "#0000FF"},
    {title: "Absent", date: '2022-09-09', color: "#FF0000"},
    {title: "Absent", date: '2022-09-11', color: "#FF0000"},
  ] 

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true ,
    events: this.events,
    locale: 'fr',
    firstDay: 1,
    selectable: true
    
  };

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends 
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
