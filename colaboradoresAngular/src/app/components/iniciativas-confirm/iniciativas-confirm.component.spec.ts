import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciativasConfirmComponent } from './iniciativas-confirm.component';

describe('IniciativasConfirmComponent', () => {
  let component: IniciativasConfirmComponent;
  let fixture: ComponentFixture<IniciativasConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciativasConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciativasConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
