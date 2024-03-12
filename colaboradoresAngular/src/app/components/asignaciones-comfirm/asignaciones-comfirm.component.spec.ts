import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionesComfirmComponent } from './asignaciones-comfirm.component';

describe('AsignacionesComfirmComponent', () => {
  let component: AsignacionesComfirmComponent;
  let fixture: ComponentFixture<AsignacionesComfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionesComfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionesComfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
