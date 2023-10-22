import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppPageFullTableComponent } from './pages/app-page-full-table/app-page-full-table.component';
import { AppPageMainComponent } from './pages/app-page-main/app-page-main.component';
import { AppPageShortTableComponent } from './pages/app-page-short-table/app-page-short-table.component';
import { AppFullTableComponent } from './components/app-full-table/app-full-table.component';
import { AppShortTableComponent } from './components/app-short-table/app-short-table.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AppPageFullTableComponent,
    AppPageMainComponent,
    AppPageShortTableComponent,
    AppFullTableComponent,
    AppShortTableComponent,
    AppLayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
