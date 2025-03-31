import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarLateralChartComponent } from './bar-lateral-chart.component';

describe('BarLateralChartComponent', () => {
  let component: BarLateralChartComponent;
  let fixture: ComponentFixture<BarLateralChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarLateralChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarLateralChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
