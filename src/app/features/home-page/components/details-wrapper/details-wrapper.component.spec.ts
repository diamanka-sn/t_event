import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsWrapperComponent } from './details-wrapper.component';

describe('DetailsWrapperComponent', () => {
  let component: DetailsWrapperComponent;
  let fixture: ComponentFixture<DetailsWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsWrapperComponent]
    });
    fixture = TestBed.createComponent(DetailsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
