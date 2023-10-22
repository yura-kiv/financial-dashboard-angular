import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPageMainComponent } from './pages/app-page-main/app-page-main.component';
import { AppPageFullTableComponent } from './pages/app-page-full-table/app-page-full-table.component';
import { AppPageShortTableComponent } from './pages/app-page-short-table/app-page-short-table.component';

const routes: Routes = [
  { path: '', component: AppPageMainComponent },
  { path: 'full-table', component: AppPageFullTableComponent },
  { path: 'short-table', component: AppPageShortTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
