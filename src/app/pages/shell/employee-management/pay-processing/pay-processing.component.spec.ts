import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayProcessingComponent } from './pay-processing.component';

describe('PayProcessingComponent', () => {
  let component: PayProcessingComponent;
  let fixture: ComponentFixture<PayProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayProcessingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
