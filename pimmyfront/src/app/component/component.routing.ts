import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { AjoutUtilisateurComponent } from './administrateur/ajout-utilisateur/ajout-utilisateur.component';
import { FermetureInstitutionComponent } from './administrateur/fermeture-institution/fermeture-institution.component';
import { FicheUtilisateurComponent } from './administrateur/fiche-utilisateur/fiche-utilisateur.component';
import { MotifAbsenceComponent } from './administrateur/motif-absence/motif-absence.component';
import { ServicesComponent } from './administrateur/services/services.component';
import { SyntheseCongesComponent } from './administrateur/synthese-conges/synthese-conges.component';
import { ValidationCongesComponent } from './administrateur/validation-conges/validation-conges.component';
import { VisibiliteEmployesComponent } from './administrateur/visibilite-employes/visibilite-employes.component';
import { ValidationCongesManagerComponent } from './manager/validation-conges-manager/validation-conges-manager.component';
import { VisualisationAbsencesComponent } from './manager/visualisation-absences/visualisation-absences.component';
import { ConventionCollectiveComponent } from './utilisateur/convention-collective/convention-collective.component';
import { DemandeCongesComponent } from './utilisateur/demande-conges/demande-conges.component';
import { VisualisationComponent } from './utilisateur/visualisation/visualisation.component';
import { LoginComponent } from './login/login.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'table',
				component: TableComponent
			},
			{
				path: 'card',
				component: CardsComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'badges',
				component: BadgeComponent
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: ButtonsComponent
			},
			{
				path: 'login',
				component: LoginComponent
			},

			// Administrateur
			{
				path: 'ajout-utilisateur',
				component: AjoutUtilisateurComponent
			},
			{
				path: 'fermeture-institution',
				component: FermetureInstitutionComponent
			},
			{
				path: 'fiche-utilisateur',
				component: FicheUtilisateurComponent
			},
			{
				path: 'motif-absence',
				component: MotifAbsenceComponent
			},
			{
				path: 'services',
				component: ServicesComponent
			},
			{
				path: 'synthese-conges',
				component: SyntheseCongesComponent
			},
			{
				path: 'validation-conges',
				component: ValidationCongesComponent
			},
			{
				path: 'visibilite-employes',
				component: VisibiliteEmployesComponent
			},

			// Manager
			{
				path: 'validation-conges-manager',
				component: ValidationCongesManagerComponent
			},
			{
				path: 'visualisation-absences',
				component: VisualisationAbsencesComponent
			},

			// Utilisateur
			{
				path: 'convention-collective',
				component: ConventionCollectiveComponent
			},
			{
				path: 'demande-conges',
				component: DemandeCongesComponent
			},
			{
				path: 'visualisation',
				component: VisualisationComponent
			},
		]
	}
];
