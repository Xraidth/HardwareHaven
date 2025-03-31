import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProductsComponent } from './top-products.component';

describe('TopProductsComponent', () => {
  let component: TopProductsComponent;
  let fixture: ComponentFixture<TopProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
