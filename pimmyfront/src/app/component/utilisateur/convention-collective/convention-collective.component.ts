import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-convention-collective',
  templateUrl: './convention-collective.component.html',
  styleUrls: ['./convention-collective.component.scss']
})
export class ConventionCollectiveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pdfSource = "../../../../assets/ressources/convention-collective.pdf"

}
