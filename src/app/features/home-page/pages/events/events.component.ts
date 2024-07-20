import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';
import { EventService } from 'src/app/core/services/event.service';
import { DetailsWrapperComponent } from '../../components/details-wrapper/details-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  placeholderMessage: string = "Rechercher un événement"
  events$ !: Observable<any[]>;
  filterEvents$ !: Observable<any[]>;
  totalEvents: number = 300;
  pageSize: number = 9;
  pageIndex: number = 1;
  private unsubscribe$ = new Subject<void>();

  constructor(public eventService: EventService, private router:Router, private dialog: MatDialog, private messageService: MessageService) { }
  ngOnInit(): void {
    this.getAll(this.pageSize, this.pageIndex);
  }

  getAll(limit: number, page: number) {
    this.eventService.readAllPaginate(`events/all?limit=${limit}&page=${page}`).subscribe(response => {
      this.events$ = of(response.data);
      this.totalEvents = response.total;
    });
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

  onPageChange(event: any) {
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex + 1;
    this.getAll(this.pageSize, this.pageIndex);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = 1; 
    this.getAll(this.pageSize, this.pageIndex);
  }
  details(event: any) {
    const ref = this.openDialog(event);
    ref.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      console.log(result)
      if (result === 'ok') {
        this.messageService.add({ severity: 'success', summary: 'Événement', detail: 'Inscription ressie.' });
        this.getAll(this.pageSize, this.pageIndex)
      }
    });
  }

  private openDialog(data: any, options = { width: '50vw', height: '80vh', minWidth: '400px' },) {
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
}
