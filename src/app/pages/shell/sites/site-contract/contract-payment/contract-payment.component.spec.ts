import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPaymentComponent } from './contract-payment.component';

describe('ContractPaymentComponent', () => {
  let component: ContractPaymentComponent;
  let fixture: ComponentFixture<ContractPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
