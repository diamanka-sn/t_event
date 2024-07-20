import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import { CreateComponent } from '../create/create.component';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent {

  message: string = 'Recherche ...'
  events$ !: Observable<any[]>;
  filterEvents$ !: Observable<any[]>;
  private unsubscribe$ = new Subject<void>();
  userInfo: any
  totalEvents: number = 300;
  pageSize: number = 5;
  pageIndex: number = 1;
  constructor(public eventService: EventService,private router:Router, private authService: AuthService, private dialog: MatDialog, private messageService: MessageService) { }
  

  ngOnInit(): void {
    this.getAll(this.pageSize, this.pageIndex);

    this.authService.userInfo$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(userInfo => {
        this.userInfo = userInfo;
      });
  }

  getAll(limit: number, page: number) {
    this.eventService.readAllPaginate(`users/events/my?limit=${limit}&page=${page}`).subscribe(response => {
      this.events$ = of(response.data);
      this.totalEvents = response.total;
    });
  }

  open() {
    const dialogRef = this.openDialog();

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result === 'refresh') {
        this.getAll(this.pageSize, this.pageIndex);
        this.messageService.add({ severity: 'success', summary: 'Événement', detail: 'Événement créé avec succes.' });
      }
    });

  }

  private openDialog(options = { width: '40vw', height: '88vh', minWidth: '400px' }) {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: options.width,
      height: options.height,
      minWidth: options.minWidth,
    });

    return dialogRef;
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

  
  details(_e:string){
    this.router.navigate([`my/event/${_e}`])
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
