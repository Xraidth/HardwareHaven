import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAccessComponentComponent } from './no-access-component.component';

describe('NoAccessComponentComponent', () => {
  let component: NoAccessComponentComponent;
  let fixture: ComponentFixture<NoAccessComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoAccessComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoAccessComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
