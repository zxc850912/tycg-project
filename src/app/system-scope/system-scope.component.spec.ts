import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemScopeComponent } from './system-scope.component';

describe('SystemScopeComponent', () => {
  let component: SystemScopeComponent;
  let fixture: ComponentFixture<SystemScopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemScopeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
