import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GriidInitiativesComponent } from './griid-initiatives.component';

describe('GriidInitiativesComponent', () => {
  let component: GriidInitiativesComponent;
  let fixture: ComponentFixture<GriidInitiativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GriidInitiativesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GriidInitiativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
