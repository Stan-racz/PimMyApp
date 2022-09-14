import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from "./table/table.component";

import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';

// Administrateur
import { AjoutUtilisateurComponent } from './administrateur/ajout-utilisateur/ajout-utilisateur.component';
import { FermetureInstitutionComponent } from './administrateur/fermeture-institution/fermeture-institution.component';
import { FicheUtilisateurComponent } from './administrateur/fiche-utilisateur/fiche-utilisateur.component';
import { MotifAbsenceComponent } from './administrateur/motif-absence/motif-absence.component';
import { ServicesComponent } from './administrateur/services/services.component';
import { SyntheseCongesComponent } from './administrateur/synthese-conges/synthese-conges.component';
import { ValidationCongesComponent } from './administrateur/validation-conges/validation-conges.component';
// import { VisibiliteEmployesComponent } from './administrateur/visibilite-employes/visibilite-employes.component';

// Manager
import { ValidationCongesManagerComponent } from './manager/validation-conges-manager/validation-conges-manager.component';
import { VisualisationAbsencesComponent } from './manager/visualisation-absences/visualisation-absences.component';

// Utilisateur
import { ConventionCollectiveComponent } from './utilisateur/convention-collective/convention-collective.component';
// import { DemandeCongesComponent } from './utilisateur/demande-conges/demande-conges.component';
import { VisualisationComponent } from './utilisateur/visualisation/visualisation.component';
import { NgxGanttModule } from '@worktile/gantt';
import { VisibiliteEmployesComponent } from './administrateur/visibilite-employes/visibilite-employes.component';

@NgModule({
  imports: [
    NgxGanttModule,
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,

  ],
  declarations: [
    NgbdpaginationBasicComponent,
    NgbdAlertBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    ButtonsComponent,
    CardsComponent,
    TableComponent,
    LoginComponent,
    // Administrateur
    AjoutUtilisateurComponent,
    FermetureInstitutionComponent,
    FicheUtilisateurComponent,
    MotifAbsenceComponent,
    ServicesComponent,
    SyntheseCongesComponent,
    ValidationCongesComponent,
    // Manager
    VisibiliteEmployesComponent,
    ValidationCongesManagerComponent,
    VisualisationAbsencesComponent,
    // Utilisateur
    ConventionCollectiveComponent,
    // DemandeCongesComponent,
    VisualisationComponent
  ]
})
export class ComponentsModule { }
