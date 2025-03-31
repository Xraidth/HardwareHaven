import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartDashBoardComponent } from './start-dash-board.component';

describe('StartDashBoardComponent', () => {
  let component: StartDashBoardComponent;
  let fixture: ComponentFixture<StartDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartDashBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
