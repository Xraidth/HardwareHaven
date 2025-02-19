import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCarComponent } from './carrito.component';

describe('ShopCarComponent', () => {
  let component: ShopCarComponent;
  let fixture: ComponentFixture<ShopCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
