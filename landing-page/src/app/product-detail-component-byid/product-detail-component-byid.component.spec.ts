import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponentByidComponent } from './product-detail-component-byid.component';

describe('ProductDetailComponentByidComponent', () => {
  let component: ProductDetailComponentByidComponent;
  let fixture: ComponentFixture<ProductDetailComponentByidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponentByidComponent]
    });
    fixture = TestBed.createComponent(ProductDetailComponentByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
