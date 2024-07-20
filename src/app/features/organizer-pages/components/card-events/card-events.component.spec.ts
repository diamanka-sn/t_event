import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEventsComponent } from './card-events.component';

describe('CardEventsComponent', () => {
  let component: CardEventsComponent;
  let fixture: ComponentFixture<CardEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardEventsComponent]
    });
    fixture = TestBed.createComponent(CardEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
