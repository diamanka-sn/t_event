import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-footer-card',
  templateUrl: './footer-card.component.html',
  styleUrls: ['./footer-card.component.scss']
})
export class FooterCardComponent implements OnInit {
  categorie !: number;
  event!: number
  organizer !: number;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    forkJoin({
      categorie: this.eventService.getNumber('categories/count'),
      event: this.eventService.getNumber('events/count'),
      organizer: this.eventService.getNumber('events/countOrganizer')
    }).subscribe(({ categorie, event, organizer }) => {
      console.log(event)
      this.categorie = categorie ? categorie : 105
      this.event = event ? event : 90;
      this.organizer = organizer ? organizer : 50;
    });


  }
}
