import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAUComponent } from './dau.component';

describe('DAUComponent', () => {
  let component: DAUComponent;
  let fixture: ComponentFixture<DAUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DAUComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DAUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
