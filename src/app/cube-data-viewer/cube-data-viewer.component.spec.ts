import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubeDataViewerComponent } from './cube-data-viewer.component';

describe('CubeDataViewerComponent', () => {
  let component: CubeDataViewerComponent;
  let fixture: ComponentFixture<CubeDataViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CubeDataViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CubeDataViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
