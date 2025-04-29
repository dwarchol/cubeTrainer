import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSolutionModeComponent } from './show-solution-mode.component';

describe('ShowSolutionModeComponent', () => {
  let component: ShowSolutionModeComponent;
  let fixture: ComponentFixture<ShowSolutionModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSolutionModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowSolutionModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
