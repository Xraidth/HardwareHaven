import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSalesBoardComponent } from './recent-sales-board.component';

describe('RecentSalesBoardComponent', () => {
  let component: RecentSalesBoardComponent;
  let fixture: ComponentFixture<RecentSalesBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentSalesBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentSalesBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
