import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject, finalize, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  profileForm: FormGroup;
  userInfo: any;
  uploading: boolean = false;
  private unsubscribe$ = new Subject<void>();
  categories$ !: Observable<any[]>;
  preferences: string[] = []
  visible: boolean = false;
  constructor(private confirmationService: ConfirmationService, private authService: AuthService, private eventService: EventService, private fb: FormBuilder, private messageService: MessageService) {
    this.profileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      phone: ['']
    });
  }

  showDialog() {
    this.visible = true;
    this.getAllCategories()
  }

  ngOnInit(): void {
    this.authService.userInfo$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(userInfo => {
        this.userInfo = userInfo;
        this.preferences = this.userInfo?.preferences ? this.userInfo?.preferences : [];
        this.setDefaultValues();
      });
  }

  setDefaultValues(): void {
    if (this.userInfo) {
      this.profileForm.patchValue({
        firstname: this.userInfo.firstname || '',
        lastname: this.userInfo.lastname || '',
        email: this.userInfo.email || '',
        phone: this.userInfo.phone || ''
      });
    }
  }

  isPreferencePresent(_c: string): boolean {
    const isPresent = this.userInfo?.preferences.includes(_c);
    return isPresent;
  }

  async getAllCategories() {
    this.categories$ = this.eventService.readAll('categories')
  }

  onSubmit(event: any): void {
    if (this.profileForm.valid) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Voulez vous vraiment modifier vos informations?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Confirmer',
        rejectVisible: false,
        acceptButtonStyleClass: 'p-button-sm',
        accept: () => {
          this.authService.update('users', this.profileForm.value)
            .subscribe(
              response => {
                localStorage.setItem('user_info', JSON.stringify(response));
                this.unsubscribe$.next(response);
                this.messageService.add({ severity: 'success', summary: 'Confirmer', detail: 'Informations mises à jour.' });
              },
              error => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la modification.', life: 3000 });
              }
            );
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la modification.', life: 3000 });
        }
      });

    }
  }

  onChangeProfilePhoto(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadProfilePhoto(file);
    }
  }

  uploadProfilePhoto(file: File): void {
    this.uploading = true;
    const formData = new FormData();
    formData.append('file', file);

    this.authService.uploadProfile(formData)
      .pipe(finalize(() => {
        this.fileInput.nativeElement.value = '';
      }))
      .subscribe(
        response => {
          this.userInfo = response;
          this.uploading = false;
        },
        error => {
          console.log(error)
          this.uploading = false;
        }
      );
  }

  isSelected(_c: string): boolean {
    return this.preferences.includes(_c);
  }

  selectCategory(_c: string): void {
    const index = this.preferences.indexOf(_c);
    if (index > -1) {
      this.preferences.splice(index, 1);
    } else {
      if (this.preferences.length < 5) {
        this.preferences.push(_c);
      }
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.submitSelections();
    }
  }

  submitSelections(): void {
    this.authService.update('users/preferences', { "preferences": this.preferences })
      .subscribe(
        response => {
          localStorage.setItem('user_info', JSON.stringify(response));
          this.unsubscribe$.next(response);
          this.messageService.add({ severity: 'success', summary: 'Confirmer', detail: 'Centres d\'intérêt mises à jour.' });
          this.visible = false
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la modification.', life: 3000 });
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
