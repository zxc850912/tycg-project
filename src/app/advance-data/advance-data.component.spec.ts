import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceDataComponent } from './advance-data.component';

describe('AdvanceDataComponent', () => {
  let component: AdvanceDataComponent;
  let fixture: ComponentFixture<AdvanceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
