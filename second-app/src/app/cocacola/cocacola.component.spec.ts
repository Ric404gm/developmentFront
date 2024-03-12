import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocacolaComponent } from './cocacola.component';

describe('CocacolaComponent', () => {
  let component: CocacolaComponent;
  let fixture: ComponentFixture<CocacolaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocacolaComponent]
    });
    fixture = TestBed.createComponent(CocacolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
