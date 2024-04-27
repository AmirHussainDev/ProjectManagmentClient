import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteContractComponent } from './site-contract.component';

describe('SiteContractComponent', () => {
  let component: SiteContractComponent;
  let fixture: ComponentFixture<SiteContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiteContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
