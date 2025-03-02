import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopCarComponent } from './shop-car.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SessionService } from '../../../../core/services/share/session.service';

describe('ShopCarComponent', () => {
  let component: ShopCarComponent;
  let fixture: ComponentFixture<ShopCarComponent>;

  beforeEach(async () => {

    SessionService.user = { carrito: [] };

    await TestBed.configureTestingModule({
      imports: [
        ShopCarComponent,
        CommonModule,
        HttpClientTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
