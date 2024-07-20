import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-recherche',
    template: `
      <input type="text" class="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" [placeholder]="placeholderMessage" (keyup)="searchChanged($event)">
      <i class="pi pi-search absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"></i>
    `,
    styles: [``]
})
export class RechercheComponent implements OnInit {
    @Input() placeholderMessage!: string;
    @Output() searched: EventEmitter<string> = new EventEmitter();
    constructor() { }

    ngOnInit(): void { } 

    searchChanged(ev: any) {
        const text: string = ev.target.value;
        this.searched.emit(text);
    }
}