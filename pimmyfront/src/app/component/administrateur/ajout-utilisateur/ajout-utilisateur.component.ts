import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.scss']
})
export class AjoutUtilisateurComponent implements OnInit {
  
  postId: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post<any>('https://localhost:4200/component/ajout-utilisateur', { title: 'Angular POST Request Example' }).subscribe(data => {
            this.postId = data.id;
        })
  }

}
