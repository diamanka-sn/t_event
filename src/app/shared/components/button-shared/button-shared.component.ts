import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-shared',
  templateUrl: './button-shared.component.html',
  styleUrls: ['./button-shared.component.scss']
})
export class ButtonSharedComponent {
  @Input() isPrincipal!: boolean;
  @Input() isSecondary!: boolean;
  @Input() btnText!: string;
  @Input() isSubmit!: boolean;
  @Input() isDisabled!: boolean | null;
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter();

  clicked(){
    this.buttonClicked.emit();
  }
}
