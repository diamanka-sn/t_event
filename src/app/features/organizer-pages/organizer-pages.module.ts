import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfilComponent } from 'src/app/shared/components/profil/profil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardEventsComponent } from './components/card-events/card-events.component';
import { TableEventsComponent } from './components/table-events/table-events.component';
import { AsideEventsComponent } from './components/aside-events/aside-events.component';
import { ChartEventsComponent } from './components/chart-events/chart-events.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { DetailsComponent } from './pages/mes-events/details/details.component';
import { ListeComponent } from './pages/mes-events/liste/liste.component';
import { CreateComponent } from './pages/mes-events/create/create.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
          path: 'event',
          component: ListeComponent,
        },
        {
          path: 'event/:slug',
          component: DetailsComponent,
        },
        {
          path: 'profil',
          component: ProfilComponent
        }

    ]
  }
]

@NgModule({
  declarations: [
    PagesComponent,
    CreateEventComponent,
    TopHeaderComponent,
    SidebarComponent,
    DashboardComponent,
    CardEventsComponent,
    TableEventsComponent,
    AsideEventsComponent,
    ChartEventsComponent,
    DetailsComponent,
    ListeComponent,
    CreateComponent,
  ],
    imports: [
    RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        NgApexchartsModule,
    ]
})
export class OrganizerPagesModule { }
