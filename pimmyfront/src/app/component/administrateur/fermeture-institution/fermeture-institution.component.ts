import { Component, OnInit } from '@angular/core';
import { MainConfig } from '../../../mainConfig';
// import { AbsenceService } from '../../../absenceService';

@Component({
  selector: 'app-fermeture-institution',
  templateUrl: './fermeture-institution.component.html',
  styleUrls: ['./fermeture-institution.component.scss']
})
export class FermetureInstitutionComponent implements OnInit {

  constructor(
    // private absenceService: AbsenceService
    private mainConfig: MainConfig,
  ) { }

  ngOnInit(): void {
  }

  onClick() {
    this.mainConfig.getMotifsAbsence().subscribe(data => console.log(data));
    this.mainConfig.getUserIdByMail("stan@racz.com").subscribe(data => console.log("lol", data));
  }

}
