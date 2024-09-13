import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaCompraComponent } from './linea-compra.component';

describe('LineaCompraComponent', () => {
  let component: LineaCompraComponent;
  let fixture: ComponentFixture<LineaCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineaCompraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
