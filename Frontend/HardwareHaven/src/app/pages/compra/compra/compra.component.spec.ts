import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { UserNavComponent } from '../../../shared/user-nav/user-nav.component';
import { ShopCarComponent } from '../../../features/purchases/carrito/shopCar/shop-car.component';
import { SummaryPurchaseComponent } from '../../../features/purchases/resumenCompra/resumen-compra/summary-purchase.component';
import { SessionService } from '../../../core/services/share/session.service';
import { of } from 'rxjs';
import { PurchaseComponent } from './compra.component';

// Mock de SessionService
jest.mock('../../../core/services/share/session.service', () => ({
  SessionService: {
    user: { carrito: [] }, // Valor inicial del carrito
  },
}));

describe('PurchaseComponent', () => {
  let component: PurchaseComponent;
  let fixture: ComponentFixture<PurchaseComponent>;
  let router: Router;

  beforeEach(async () => {
    // Configuración de TestBed
    await TestBed.configureTestingModule({
      declarations: [PurchaseComponent, UserNavComponent, ShopCarComponent, SummaryPurchaseComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inyecta el router
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize usuario and carrito on ngOnInit', () => {
    component.ngOnInit();
    expect(component.usuario).toBe(SessionService.user);
    expect(component.carrito).toBe(SessionService.user.carrito);
  });

  it('should set mostrarBoton to false if carrito is empty', () => {
    component.ngOnInit();
    expect(component.mostrarBoton).toBe(false);
  });

  it('should set mostrarBoton to true if carrito has items', () => {
    // Modificamos el carrito de SessionService para el test
    SessionService.user.carrito = [{ item: 'item1' }];
    component.ngOnInit();
    expect(component.mostrarBoton).toBe(true);
  });

  it('should call pasarAListaProductos and navigate to productList', () => {
    component.carrito = [{ item: 'item1' }];
    component.pasarAListaProductos();
    expect(router.navigate).toHaveBeenCalledWith(['productList']);
  });

  it('should call realizarCompra and set mostrarResumen to true', () => {
    component.realizarCompra();
    expect(component.mostrarResumen).toBe(true);
    expect(component.mostrarBoton).toBe(false);
  });
});
