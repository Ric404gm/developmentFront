import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewCollaboratorComponent } from './register-new-collaborator.component';

describe('RegisterNewCollaboratorComponent', () => {
  let component: RegisterNewCollaboratorComponent;
  let fixture: ComponentFixture<RegisterNewCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewCollaboratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNewCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
