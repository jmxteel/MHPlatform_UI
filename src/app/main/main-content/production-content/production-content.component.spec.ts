import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionContentComponent } from './production-content.component';

describe('ProductionContentComponent', () => {
  let component: ProductionContentComponent;
  let fixture: ComponentFixture<ProductionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
