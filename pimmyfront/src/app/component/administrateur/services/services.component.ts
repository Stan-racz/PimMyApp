import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Services } from './Services';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  model = new Services(18, '', '', '',);
  onSubmit(form: NgForm) {
    //si on clique sur le button formulaire :
    this.ajoutService(form);
  }
  ajoutService(form: NgForm) {
    let token = localStorage.getItem('token retourné')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(form.value)
    this.http.post('http://localhost:3000/back-end/services', { nom: form.value.Nom, nomManagerService: form.value.nomManagerService, prenomManagerService: form.value.prenomManagerService }, { headers: headers }).subscribe(data => { console.log(data) });
  }

  ngOnInit(): void {

  }

}
