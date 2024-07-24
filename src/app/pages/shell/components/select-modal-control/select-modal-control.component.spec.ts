import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectModalControlComponent } from './select-modal-control.component';

describe('SelectModalControlComponent', () => {
  let component: SelectModalControlComponent;
  let fixture: ComponentFixture<SelectModalControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectModalControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectModalControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
