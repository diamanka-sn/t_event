import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-details-wrapper',
  templateUrl: './details-wrapper.component.html',
  styleUrls: ['./details-wrapper.component.scss']
})
export class DetailsWrapperComponent {
  loading: boolean = false;
  event: any
  images!: []
  userInfo: any;
  inscrit: boolean = false
  private unsubscribe$ = new Subject<void>();
  get activeIndex(): number {
    return this._activeIndex;
  }

  set activeIndex(newValue) {
    if (this.images && 0 <= newValue && newValue <= this.images.length - 1) {
      this._activeIndex = newValue;
    }
  }

  _activeIndex: number = 0;

  ngOnInit() {
    this.event.images.map((images: any) => (this.images = images));
    this.authService.userInfo$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(userInfo => {
        this.userInfo = userInfo;
      });
    this.checkInscription()
  }

  next() {
    this.activeIndex++;
  }

  prev() {
    this.activeIndex--;
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private confirmationService: ConfirmationService, public dialogRef: MatDialogRef<DetailsWrapperComponent>, private eventService: EventService, private authService: AuthService) {
    this.event = data.data
    console.log(this.event)
  }

  inscrire() {
    if (confirm('Confirmez-vous votre inscription à cet événement ?')) {
      this.loading = true
      this.eventService.create(`users/events/${this.event?.id}/register`, null).subscribe(response => {
        if (response) {
          this.loading = false
          this.dialogRef.close('ok');
        } else {
          this.loading = false
        }
      }, error => {
        this.loading = false
      })
    }
  }

  galleriaStyle = {
    width: '30vw',
    height: '40vh',
  };

  async estInscrit(): Promise<boolean> {
    if (!this.event || !this.userInfo) {
      return false;
    }
    let u = {}
    const users = await this.eventService.read(`users/events/${this.event.id}/p`).toPromise()
    return users.some((user: { id: any; }) => user.id === this.userInfo.id);
  }
  async checkInscription() {
    this.inscrit = await this.estInscrit();
    console.log(this.inscrit)
  }
}
