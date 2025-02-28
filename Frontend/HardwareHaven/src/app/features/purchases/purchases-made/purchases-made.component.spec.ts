import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesMadeComponent } from './purchases-made.component';

describe('PurchasesMadeComponent', () => {
  let component: PurchasesMadeComponent;
  let fixture: ComponentFixture<PurchasesMadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasesMadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchasesMadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
