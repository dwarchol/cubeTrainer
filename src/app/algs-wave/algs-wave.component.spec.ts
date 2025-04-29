import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgsWaveComponent } from './algs-wave.component';

describe('AlgsWaveComponent', () => {
  let component: AlgsWaveComponent;
  let fixture: ComponentFixture<AlgsWaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgsWaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlgsWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
