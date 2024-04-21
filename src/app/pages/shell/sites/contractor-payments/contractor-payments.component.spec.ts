import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorPaymentsComponent } from './contractor-payments.component';

describe('ContractorPaymentsComponent', () => {
  let component: ContractorPaymentsComponent;
  let fixture: ComponentFixture<ContractorPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorPaymentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractorPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
