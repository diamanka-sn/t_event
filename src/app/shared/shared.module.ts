import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CardModule } from 'primeng/card';
import { ButtonSharedComponent } from './components/button-shared/button-shared.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RechercheComponent } from './components/recherche.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { EventItemComponent } from './components/event-item/event-item.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProfilComponent } from './components/profil/profil.component';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { RippleModule } from 'primeng/ripple';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NotificationComponent } from './components/notification/notification.component';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
const PRIMENG_MODULE = [
  CardModule,
  IconFieldModule,
  InputIconModule,
  BadgeModule,
  ToastModule,
  ChipModule,
  SkeletonModule,
  ProgressSpinnerModule,
  DividerModule,
  CarouselModule,
  CalendarModule,
  ChipsModule,
  ButtonModule,
  DialogModule,
  AvatarGroupModule,
  AvatarModule,
  RippleModule,
  ConfirmDialogModule,
  ImageModule,
  GalleriaModule
]

const MATERIAL_MODULE = [
  MatSnackBarModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule
]

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonSharedComponent,
    RechercheComponent,
    EventItemComponent,
    ProfilComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ...MATERIAL_MODULE,
    ...PRIMENG_MODULE
  ],
  exports: [
    HeaderComponent,
    ButtonSharedComponent,
    HttpClientModule,
    ReactiveFormsModule,
    RechercheComponent,
    FormsModule,
    EventItemComponent,
    ProfilComponent,
    NotificationComponent,
    ...MATERIAL_MODULE,
    ...PRIMENG_MODULE
  ]
})
export class SharedModule { }
