import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventListComponent } from './components/event-list/event-list.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FooterCardComponent } from './components/footer-card/footer-card.component';
import { DetailsWrapperComponent } from './components/details-wrapper/details-wrapper.component';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfilComponent } from 'src/app/shared/components/profil/profil.component';
import { DetailsComponent } from './pages/events/details/details.component';
import { ChatComponent } from './pages/chat/chat.component';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);
const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  }, {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'event',
        component: EventsComponent,
      },
      // {
      //   path: 'event/:slug',
      //   component: DetailsComponent,
      // },
      {
        path: 'contact',
        component: ContactComponent,
      }, {
        path: 'profil',
        component: ProfilComponent
      }, {
        path: 'chat',
        component: ChatComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    EventListComponent,
    LoginFormComponent,
    FooterCardComponent,
    DetailsWrapperComponent,
    PagesComponent,
    HomeComponent,
    EventsComponent,
    RegisterFormComponent,
    ContactComponent,
    DetailsComponent,
    ChatComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ]
})
export class HomePageModule { }
