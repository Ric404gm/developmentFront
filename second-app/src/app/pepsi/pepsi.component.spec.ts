import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PepsiComponent } from './pepsi.component';

describe('PepsiComponent', () => {
  let component: PepsiComponent;
  let fixture: ComponentFixture<PepsiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PepsiComponent]
    });
    fixture = TestBed.createComponent(PepsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
