import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserDrawerComponent } from './create-user-drawer.component';

describe('CreateUserDrawerComponent', () => {
  let component: CreateUserDrawerComponent;
  let fixture: ComponentFixture<CreateUserDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserDrawerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUserDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
