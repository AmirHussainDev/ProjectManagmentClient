import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteContractorsComponent } from './site-contractors.component';

describe('SiteContractorsComponent', () => {
  let component: SiteContractorsComponent;
  let fixture: ComponentFixture<SiteContractorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteContractorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiteContractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
