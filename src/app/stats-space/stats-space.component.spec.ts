import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSpaceComponent } from './stats-space.component';

describe('StatsSpaceComponent', () => {
  let component: StatsSpaceComponent;
  let fixture: ComponentFixture<StatsSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsSpaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
