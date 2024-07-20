import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  dropdownItems: SelectItem[] = [
    { label: 'Mon compte', value: 'account' },
    { label: 'Déconnexion', value: 'logout' }
  ];

  selectedItem: any;
}
