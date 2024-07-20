import { Component, OnInit } from '@angular/core';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';
import { EventService } from 'src/app/core/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsWrapperComponent } from '../details-wrapper/details-wrapper.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  placeholderMessage: string = "Rechercher un événement"
  events$ !: Observable<any[]>;
  categories$ !: Observable<any[]>;
  filterEvents$ !: Observable<any[]>;
  isLoggedIn!: boolean;
  private unsubscribe$ = new Subject<void>();
  userInfo: any;
  constructor(public eventService: EventService, private authService: AuthService, private dialog: MatDialog,  private messageService: MessageService) { }
  ngOnInit(): void {
    this.getAllCategories()
    this.authService.authState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      });

    this.authService.userInfo$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(userInfo => {
        this.userInfo = userInfo;
      });
    this.getAll(this.isLoggedIn ? 4 : 6, 1)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getAll(limit: number, page: number) {
    this.eventService.readAllPaginate(`events/all?limit=${limit}&page=${page}`).subscribe(response => {
      this.events$ = of(response.data);
      this.filterEvents$ = this.events$
    });
  }

  async getAllCategories() {
    this.categories$ = this.eventService.readAll('categories')
  }
  async search(_s: string) {
    if (_s.trim() === null || !_s.length) {
      this.events$ = this.filterEvents$;
    }

    this.events$ = this.filterEvents$.pipe(
      map(events => events.filter(event => event.title.toLowerCase().includes(_s.toLowerCase()) ||
        event.content.toLowerCase().includes(_s.toLowerCase()) ||
        event.location.toLowerCase().includes(_s.toLowerCase()) ||
        event.user.firstname.toLowerCase().includes(_s.toLowerCase()) ||
        event.user.lastname.toLowerCase().includes(_s.toLowerCase()) ||
        new Date(event.date).toLocaleDateString().includes(_s.toLowerCase())
      ))
    );
  }

  details(event: any) {
    const ref = this.openDialog(event);
    ref.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      console.log(result)
      if (result === 'ok') {
        this.messageService.add({ severity: 'success', summary: 'Événement', detail: 'Inscription ressie.' });
      }
    });
  }

  private openDialog(data: any, options = { width: '60vw', height: '100vh', minWidth: '400px' },) {
    const dialogRef = this.dialog.open(DetailsWrapperComponent, {
      width: options.width,
      data: {
        title: 'Détails de l\'événement',
        data: data,
      },
      height: options.height,
      minWidth: options.minWidth,
    });

    return dialogRef;
  }

  inscrire(_e: any) {
    this.eventService.create(`users/events/${_e?.id}/register`, null).subscribe(res => console.log(res))
  }
}
