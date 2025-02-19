import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPurchaseComponent } from './resumen-compra.component';

describe('SummaryPurchaseComponent', () => {
  let component: SummaryPurchaseComponent;
  let fixture: ComponentFixture<SummaryPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryPurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryPurchase Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
