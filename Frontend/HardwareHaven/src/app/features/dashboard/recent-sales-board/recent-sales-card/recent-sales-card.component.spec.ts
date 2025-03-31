import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSalesCardComponent } from './recent-sales-card.component';

describe('RecentSalesCardComponent', () => {
  let component: RecentSalesCardComponent;
  let fixture: ComponentFixture<RecentSalesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentSalesCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentSalesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
