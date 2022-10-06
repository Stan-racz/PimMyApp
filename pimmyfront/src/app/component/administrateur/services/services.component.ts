import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Services } from './Services';
import { map, Observable, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  status: any;
  services: Services[] = [];
  displayedColumns: string[] = ['nom', 'nomManagerService', 'prenomManagerService', 'actions'];
  private dataSource = new MatTableDataSource<Services>();
  constructor(private http: HttpClient, private router: Router) { }
  model = new Services(18, '', '', '',);
  onSubmit(form: NgForm) {
    //si on clique sur le button formulaire :
    if (form.valid) {
      this.ajoutService(form);
    }
  }
  ajoutService(form: NgForm) {
    console.log(form.value)
    this.http.post('http://localhost:3000/back-end/services', { nomService: form.value.Nom, nomManagerService: form.value.nomManagerService, prenomManagerService: form.value.prenomManagerService }, { headers: this.getHeaders() }).subscribe(data => { console.log(data) });
    this.reloadCurrentRoute();
  }

  thingsAsMatTableDataSource$: Observable<MatTableDataSource<Services>> = this.getServicesData().pipe(
    map((serv: any) => {
      const dataSource = this.dataSource;
      dataSource.data = serv;
      return dataSource;
    })
  );

  ngOnInit(): void {
    // this.getServicesData().subscribe({
    //     next: (services: Services[]) => {
    //       this.services = services;
    //       console.log(this.services);
    //     }
    //   });
    // this.dataSource = new MatTableDataSource(this.tableauData);
  }

  getHeaders() {
    let token = localStorage.getItem('token retourné')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return headers;
  }

  suppressionService(row: any) {
    console.log('http://localhost:3000/back-end/services/' + row['nom'])
    this.http.delete<Services>('http://localhost:3000/back-end/services/' + row['nom'], { headers: this.getHeaders() }).subscribe(() => this.status = 'Delete successful');
    this.reloadCurrentRoute();
  }

  getServicesData() {
    return this.http.get<Services[]>('http://localhost:3000/back-end/services', { headers: this.getHeaders() }).pipe(
      map((services: any[]) => services.map(
        service => {
          return <Services>{
            nom: service["nom"],
            nomManagerService: service["manager_Nom"],
            prenomManagerService: service['manager_Prenom']
          }
        })
      ),
    )
  }


  reloadCurrentRoute() {
    console.log("coucou")
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
