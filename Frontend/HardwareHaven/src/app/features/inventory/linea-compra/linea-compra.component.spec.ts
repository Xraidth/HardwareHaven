import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseLineComponent } from './linea-compra.component';

describe('PurchaseLineComponent', () => {
  let component: PurchaseLineComponent;
  let fixture: ComponentFixture<PurchaseLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
