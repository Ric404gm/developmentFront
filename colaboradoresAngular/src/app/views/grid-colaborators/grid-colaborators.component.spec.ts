import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridColaboratorsComponent } from './grid-colaborators.component';

describe('GridColaboratorsComponent', () => {
  let component: GridColaboratorsComponent;
  let fixture: ComponentFixture<GridColaboratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridColaboratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridColaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
