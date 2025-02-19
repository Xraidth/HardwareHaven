import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCarCardComponent } from './carrito-card.component';

describe('ShopCarCardComponent', () => {
  let component: ShopCarCardComponent;
  let fixture: ComponentFixture<ShopCarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCarCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
