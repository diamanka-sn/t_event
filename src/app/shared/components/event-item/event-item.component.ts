import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent {
  @Input() event: any;
  @Input() isOrganizer: boolean = false
  @Input() estInscrit: boolean = false
  @Output() detailsClicked: EventEmitter<any> = new EventEmitter();
  
  details(_e:string){
    this.detailsClicked.emit();
  }
}
