import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalSymbolsComponent } from './graphical-symbols.component';

describe('GraphicalSymbolsComponent', () => {
  let component: GraphicalSymbolsComponent;
  let fixture: ComponentFixture<GraphicalSymbolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicalSymbolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicalSymbolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
