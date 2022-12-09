import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
// import { ValidationCongesComponent } from './administrateur/validation-conges/validation-conges.component';
import { VisibiliteEmployesComponent } from './administrateur/visibilite-employes/visibilite-employes.component';

// Manager
// import { ValidationCongesManagerComponent } from './manager/validation-conges-manager/validation-conges-manager.component';
import { VisualisationAbsencesComponent } from './manager/visualisation-absences/visualisation-absences.component';

// Utilisateur
import { ConventionCollectiveComponent } from './utilisateur/convention-collective/convention-collective.component';
// import { DemandeCongesComponent } from './utilisateur/demande-conges/demande-conges.component';
import { VisualisationComponent } from './utilisateur/visualisation/visualisation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MainConfig } from '../../app/mainConfig';

import { DxButtonModule, DxSelectBoxComponent, DxSelectBoxModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    RouterModule.forChild(ComponentsRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatToolbarModule,
    PdfViewerModule,
    DxButtonModule,
    DxSelectBoxModule,
  ],
  declarations: [
    NgbdpaginationBasicComponent,
    NgbdAlertBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    ButtonsComponent,
    CardsComponent,
    TableComponent,
    // Administrateur
    AjoutUtilisateurComponent,
    FermetureInstitutionComponent,
    FicheUtilisateurComponent,
    MotifAbsenceComponent,
    ServicesComponent,
    SyntheseCongesComponent,
    // ValidationCongesComponent,
    // Manager
    VisibiliteEmployesComponent,
    // ValidationCongesManagerComponent,
    VisualisationAbsencesComponent,
    // Utilisateur
    ConventionCollectiveComponent,
    // DemandeCongesComponent,
    VisualisationComponent
  ],
  providers: [
    MainConfig
  ]
})
export class ComponentsModule { }
