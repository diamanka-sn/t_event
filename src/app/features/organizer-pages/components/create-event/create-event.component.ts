import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { EventService } from 'src/app/core/services/event.service';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  eventForm!: FormGroup;
  categories$!: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private categorieService: CategoryService,
    public dialogRef: MatDialogRef<CreateEventComponent>,
    private messageService: MessageService

  ) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      date: ['', Validators.required],
      isFree: [false],
      place: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required]
    });
    this.getAllcategorie()
  }

  getAllcategorie() {
    this.categories$ = this.categorieService.readAll('categories')
  }

  get title() {
    return this.eventForm.get('title');
  }

  get content() {
    return this.eventForm.get('content');
  }

  get date() {
    return this.eventForm.get('date');
  }

  get isFree() {
    return this.eventForm.get('isFree');
  }

  get location() {
    return this.eventForm.get('location');
  }

  get category() {
    return this.eventForm.get('category');
  }

  get place(){
    return this.eventForm.get('place')
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const data = this.eventForm.value
      console.log(data)
      this.eventService.create('users/events', data).subscribe(
        response=>{
          if(response){
            this.dialogRef.close()
            // window.location.reload();
          }
        }
      )
    }
  }


  uploadedFiles: any[] = [];


  onUpload(event:UploadEvent) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }

      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
}
