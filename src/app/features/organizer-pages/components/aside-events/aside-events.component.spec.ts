import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideEventsComponent } from './aside-events.component';

describe('AsideEventsComponent', () => {
  let component: AsideEventsComponent;
  let fixture: ComponentFixture<AsideEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsideEventsComponent]
    });
    fixture = TestBed.createComponent(AsideEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
