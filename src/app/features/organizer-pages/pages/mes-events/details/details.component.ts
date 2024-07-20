import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subject, takeUntil } from 'rxjs';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  event: any;
  participants!: any[];
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.getEventDetails();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getEventDetails() {
    const slug = this.route.snapshot.params['slug'];

    this.eventService.read(`events/${slug}`).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: any) => {
        console.log(res);
        this.event = res;
        this.getParticipantsList();
      }
    );
  }

  getParticipantsList() {
    if (!this.event || !this.event.id) {
      return;
    }

    this.eventService.readAll(`users/events/${this.event.id}/participants`).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: any[]) => {
        this.participants = res;
      }
    );
  }

  goback(){
    window.history.back();
  }
}