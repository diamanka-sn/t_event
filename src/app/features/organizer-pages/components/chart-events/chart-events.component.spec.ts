import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEventsComponent } from './chart-events.component';

describe('ChartEventsComponent', () => {
  let component: ChartEventsComponent;
  let fixture: ComponentFixture<ChartEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartEventsComponent]
    });
    fixture = TestBed.createComponent(ChartEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
