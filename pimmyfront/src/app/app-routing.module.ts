import { Routes, } from '@angular/router';
import { LoginComponent } from "./component/login/login.component";

export const Approutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  // {
  //   path: 'component',
  //   loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
  // },
  {
    path: '**',
    redirectTo: '/'
  }
];
