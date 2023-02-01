import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DxButtonModule, DxSelectBoxModule } from "devextreme-angular";
import { NgApexchartsModule } from "ng-apexcharts";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { AjoutUtilisateurComponent } from "../component/administrateur/ajout-utilisateur/ajout-utilisateur.component";
import { FermetureInstitutionComponent } from "../component/administrateur/fermeture-institution/fermeture-institution.component";
import { FicheUtilisateurComponent } from "../component/administrateur/fiche-utilisateur/fiche-utilisateur.component";
import { MotifAbsenceComponent } from "../component/administrateur/motif-absence/motif-absence.component";
import { ServicesComponent } from "../component/administrateur/services/services.component";
import { SyntheseCongesComponent } from "../component/administrateur/synthese-conges/synthese-conges.component";
import { VisibiliteEmployesComponent } from "../component/administrateur/visibilite-employes/visibilite-employes.component";
import { NgbdAlertBasicComponent } from "../component/alert/alert.component";
import { ButtonsComponent } from "../component/buttons/buttons.component";
import { CardsComponent } from "../component/card/card.component";
import { ComponentsRoutes } from "../component/component.routing";
import { NgbdDropdownBasicComponent } from "../component/dropdown-collapse/dropdown-collapse.component";
import { LoginComponent } from "../component/login/login.component";
import { VisualisationAbsencesComponent } from "../component/manager/visualisation-absences/visualisation-absences.component";
import { NgbdnavBasicComponent } from "../component/nav/nav.component";
import { NgbdpaginationBasicComponent } from "../component/pagination/pagination.component";
import { TableComponent } from "../component/table/table.component";
import { ConventionCollectiveComponent } from "../component/utilisateur/convention-collective/convention-collective.component";
import { VisualisationComponent } from "../component/utilisateur/visualisation/visualisation.component";
import { MainConfig } from "../mainConfig";
import { NavigationComponent } from "../shared/header/navigation.component";
import { SidebarComponent } from "../shared/sidebar/sidebar.component";
import { DashboardComponent } from "./dashboard.component";
import { SalesSummaryComponent } from "./dashboard-components/sales-summary/sales-summary.component";
import { FeedsComponent } from "./dashboard-components/feeds/feeds.component";
import { TopSellingComponent } from "./dashboard-components/top-selling/top-selling.component";
import { TopCardsComponent } from "./dashboard-components/top-cards/top-cards.component";
import { BlogCardsComponent } from "./dashboard-components/blog-cards/blog-cards.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    data: {
      title: "Dashboard",
      urls: [{ title: "Dashboard", url: "/" }, { title: "Dashboard" }],
    },
    children: ComponentsRoutes,
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
    NgbModule,
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
    DashboardComponent,
    SalesSummaryComponent,
    FeedsComponent,
    TopSellingComponent,
    TopCardsComponent,
    NavigationComponent,
    SidebarComponent,
    LoginComponent,
    BlogCardsComponent,
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
    // FermetureInstitutionComponent,
    FicheUtilisateurComponent,
    MotifAbsenceComponent,
    ServicesComponent,
    // SyntheseCongesComponent,
    // ValidationCongesComponent,
    // Manager
    VisibiliteEmployesComponent,
    // ValidationCongesManagerComponent,
    // VisualisationAbsencesComponent,
    // Utilisateur
    ConventionCollectiveComponent,
    // DemandeCongesComponent,
    VisualisationComponent
  ],
  providers: [MainConfig]
})
export class DashboardModule {
}
