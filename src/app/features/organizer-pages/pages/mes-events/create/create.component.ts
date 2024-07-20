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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  eventForm!: FormGroup;
  categories$!: Observable<any[]>;
  imagePreviews: string[] = [];
  imageFiles: File[] = [];
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private categorieService: CategoryService,
    public dialogRef: MatDialogRef<CreateComponent>,
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
    return this.eventForm.get('title')?.value;
  }

  get content() {
    return this.eventForm.get('content')?.value;
  }

  get date() {
    return this.eventForm.get('date')?.value;
  }

  get isFree() {
    return this.eventForm.get('isFree')?.value;
  }

  get location() {
    return this.eventForm.get('location')?.value;
  }

  get category() {
    return this.eventForm.get('category')?.value;
  }

  get place() {
    return this.eventForm.get('place')?.value
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.loading = true
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('category', this.category);
      formData.append('content', this.content);
      formData.append('date', this.date);
      formData.append('place', this.place);
      formData.append('isFree', this.isFree);
      formData.append('location', this.location);

      for (let i = 0; i < this.imageFiles.length; i++) {
        formData.append('images', this.imageFiles[i]);
      }
      console.log(formData)
      this.eventService.create('users/events', formData).subscribe(
        response => {
          if (response) {
            this.loading = false
            this.dialogRef.close('refresh');
          }
        }, error =>{
          this.loading = false
        }
      )
    }
  }


  uploadedFiles: any[] = [];

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files.length + this.imageFiles.length > 5) {
      this.messageService.add({ severity: 'error', summary: 'Événement', detail: 'Vous ne pouvez ajouter que 5 images.' });
      return
    }
    for (let file of files) {
      this.imageFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.imageFiles.splice(index, 1);
  }

  // onUpload(event:UploadEvent) {
  //     for(let file of event.files) {
  //         this.uploadedFiles.push(file);
  //     }

  //     this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  // }
}
