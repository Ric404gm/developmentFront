import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInitiativesComponent } from './dialog-initiatives.component';

describe('DialogInitiativesComponent', () => {
  let component: DialogInitiativesComponent;
  let fixture: ComponentFixture<DialogInitiativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInitiativesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInitiativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
