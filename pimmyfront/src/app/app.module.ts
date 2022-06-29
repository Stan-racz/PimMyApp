import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjoutUtilisateurComponent } from './components/administrateur/ajout-utilisateur/ajout-utilisateur.component';
import { ServicesComponent } from './components/administrateur/services/services.component';
import { SyntheseCongesComponent } from './components/administrateur/synthese-conges/synthese-conges.component';
import { ValidationCongesComponent } from './components/administrateur/validation-conges/validation-conges.component';
import { FicheUtilisateurComponent } from './components/administrateur/fiche-utilisateur/fiche-utilisateur.component';
import { MotifAbsenceComponent } from './components/administrateur/motif-absence/motif-absence.component';
import { FermetureInstitutionComponent } from './components/administrateur/fermeture-institution/fermeture-institution.component';
import { VisibiliteEmployesComponent } from './components/administrateur/visibilite-employes/visibilite-employes.component';
import { VisualisationAbsencesComponent } from './components/manager/visualisation-absences/visualisation-absences.component';
import { ValidationCongesManagerComponent } from './components/manager/validation-conges-manager/validation-conges-manager.component';
import { DemandeCongesComponent } from './components/utilisateur/demande-conges/demande-conges.component';
import { VisualisationComponent } from './components/utilisateur/visualisation/visualisation.component';
import { ConventionCollectiveComponent } from './components/utilisateur/convention-collective/convention-collective.component';
import { AccueilComponent } from './components/accueil/accueil.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AjoutUtilisateurComponent,
    ServicesComponent,
    SyntheseCongesComponent,
    ValidationCongesComponent,
    FicheUtilisateurComponent,
    MotifAbsenceComponent,
    FermetureInstitutionComponent,
    VisibiliteEmployesComponent,
    VisualisationAbsencesComponent,
    ValidationCongesManagerComponent,
    DemandeCongesComponent,
    VisualisationComponent,
    ConventionCollectiveComponent,
    AccueilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
