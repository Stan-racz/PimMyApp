import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './components/accueil/accueil.component';
import { AjoutUtilisateurComponent } from './components/administrateur/ajout-utilisateur/ajout-utilisateur.component';
import { FermetureInstitutionComponent } from './components/administrateur/fermeture-institution/fermeture-institution.component';
import { FicheUtilisateurComponent } from './components/administrateur/fiche-utilisateur/fiche-utilisateur.component';
import { MotifAbsenceComponent } from './components/administrateur/motif-absence/motif-absence.component';
import { ServicesComponent } from './components/administrateur/services/services.component';
import { SyntheseCongesComponent } from './components/administrateur/synthese-conges/synthese-conges.component';
import { ValidationCongesComponent } from './components/administrateur/validation-conges/validation-conges.component';
import { VisibiliteEmployesComponent } from './components/administrateur/visibilite-employes/visibilite-employes.component';
import { ValidationCongesManagerComponent } from './components/manager/validation-conges-manager/validation-conges-manager.component';
import { VisualisationAbsencesComponent } from './components/manager/visualisation-absences/visualisation-absences.component';
import { DemandeCongesComponent } from './components/utilisateur/demande-conges/demande-conges.component';
import { VisualisationComponent } from './components/utilisateur/visualisation/visualisation.component';
import { ConventionCollectiveComponent } from './components/utilisateur/convention-collective/convention-collective.component';



const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'ajout-utilisateur', component: AjoutUtilisateurComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'fermeture-institution', component: FermetureInstitutionComponent },
  { path: 'fiche-utilisateur', component: FicheUtilisateurComponent },
  { path: 'motif-absence', component: MotifAbsenceComponent },
  { path: 'synthese-conges', component: SyntheseCongesComponent },
  { path: 'validation-conges', component: ValidationCongesComponent },
  { path: 'visibilite-employes', component: VisibiliteEmployesComponent },
  { path: 'visualisation-conges', component: ValidationCongesComponent },
  { path: 'validation-conges-manager', component: ValidationCongesManagerComponent },
  { path: 'visualisation-absences', component: VisualisationAbsencesComponent },
  { path: 'demande-conges', component: DemandeCongesComponent },
  { path: 'visualisation', component: VisualisationComponent },
  { path: 'convention-collective', component: ConventionCollectiveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
