import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationContentComponent } from './installation-content.component';

describe('InstallationContentComponent', () => {
  let component: InstallationContentComponent;
  let fixture: ComponentFixture<InstallationContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstallationContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstallationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
