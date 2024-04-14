import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleRequestComponent } from './sale-request.component';

describe('SaleRequestComponent', () => {
  let component: SaleRequestComponent;
  let fixture: ComponentFixture<SaleRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
