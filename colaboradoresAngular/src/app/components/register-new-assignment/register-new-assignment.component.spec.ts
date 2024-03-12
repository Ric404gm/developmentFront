import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewAssignmentComponent } from './register-new-assignment.component';

describe('RegisterNewAssignmentComponent', () => {
  let component: RegisterNewAssignmentComponent;
  let fixture: ComponentFixture<RegisterNewAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNewAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
