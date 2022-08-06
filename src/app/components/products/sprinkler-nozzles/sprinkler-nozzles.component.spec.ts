import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprinklerNozzlesComponent } from './sprinkler-nozzles.component';

describe('SprinklerNozzlesComponent', () => {
  let component: SprinklerNozzlesComponent;
  let fixture: ComponentFixture<SprinklerNozzlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprinklerNozzlesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprinklerNozzlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
