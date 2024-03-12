import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAssignmentsComponent } from './grid-assignments.component';

describe('GridAssignmentsComponent', () => {
  let component: GridAssignmentsComponent;
  let fixture: ComponentFixture<GridAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAssignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
