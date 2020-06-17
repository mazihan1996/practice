import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: ':id', loadChildren: () => import('./hero-detail/hero-detail.module').then(m => m.HeroDetailModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
