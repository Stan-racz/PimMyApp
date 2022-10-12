import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-demande-conges',
  templateUrl: './demande-conges.component.html',
  styleUrls: ['./demande-conges.component.scss']
})
export class DemandeCongesComponent implements OnInit {

  motifs = ['Congé payé', 'Congé sans solde', 'RTT'];
  debut: any;
  fin: any;
  commentaire: any;
  date_deb: any;
  date_fin: any;

  displayStyle = "none";
  calendar: any;
  events = [
    { title: "RTT", start: '2022-09-30T08:00:00', end: '2022-09-30T12:00:00', color: "#272c33" },
    { title: "Congés payés ", date: '2022-10-10', color: "#272c33" },
  ]

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
      // month: "Mois",
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    businessHours: true,
    events: this.events,
    locale: 'fr',
    firstDay: 1,
    select: this.openPopup.bind(this)
  };

  constructor(private router: Router, private http: HttpClient) {
    const name = Calendar.name;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
  }

  openPopup(selectInfo: DateSelectArg) {
    console.log(selectInfo)

    this.displayStyle = "block";
    this.debut = selectInfo.startStr;
    this.fin = selectInfo.endStr;
    this.calendar = selectInfo.view.calendar;
    this.calendar.unselect();

  }

  closePopup(form: NgForm) {
    form.reset();
    this.displayStyle = "none";
  }

  onSubmit(form: NgForm) {

    const title = form.value.motif;
    // A modifier : la date de fin -> inclus quand demi-journée et exclu quand journée entière
    if (form.submitted) {

      if (form.value.debut === form.value.fin) {
        console.log('égal');
        switch (form.value.date_deb) {
          case 'deb_mat':
            this.date_deb = form.value.debut + "T08:00:00"
            this.date_fin = form.value.fin + "T12:00:00"
            break;

          case 'deb_fin':
            this.date_deb = form.value.debut + "T13:00:00"
            this.date_fin = form.value.fin + "T17:00:00"
            break;

          default:
            this.date_deb = form.value.debut
            this.date_fin = form.value.fin
            break;
        }
      }
      else {
        console.log('ok');

        if (form.value.date_deb === "deb_mat" && form.value.date_fin === "deb_mat") {
          this.date_deb = form.value.debut + "T08:00:00"
          this.date_fin = form.value.fin + "T12:00:00"
          console.log("matin et matin");

        }
        else if (form.value.date_deb === "deb_fin" && form.value.date_fin === "deb_mat") {
          this.date_deb = form.value.debut + "T13:00:00"
          this.date_fin = form.value.fin + "T12:00:00"
          console.log("ap et matin");

        }
        else if (form.value.date_deb === "deb_fin" && form.value.date_fin === "deb_fin") {
          this.date_deb = form.value.debut + "T13:00:00"
          this.date_fin = form.value.fin + "T17:00:00"
          console.log("ap et ap");

        }
        else {
          this.date_deb = form.value.debut
          this.date_fin = form.value.fin
        }
      }

      this.calendar.addEvent({
        title,
        start: this.date_deb,
        end: this.date_fin,
        // allDay: true,
        color: "#272c33",
      });

      this.events.push({ title: title, start: form.value.debut, end: form.value.fin, color: "#272c33" })

      console.log(this.events);

      form.resetForm();
      this.closePopup(form);

    }
    // console.log(localStorage.getItem('role'))
  }
  openModal() {
    this.displayStyle = "block";
    console.log(this.calendarOptions);
    // let test =new Calendar()
    console.log(this.calendar);


  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}