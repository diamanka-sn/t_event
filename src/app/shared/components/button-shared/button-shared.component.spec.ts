import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSharedComponent } from './button-shared.component';

describe('ButtonSharedComponent', () => {
  let component: ButtonSharedComponent;
  let fixture: ComponentFixture<ButtonSharedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonSharedComponent]
    });
    fixture = TestBed.createComponent(ButtonSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
