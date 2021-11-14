import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprinklerBodyComponent } from './sprinkler-body.component';

describe('SprinklerBodyComponent', () => {
  let component: SprinklerBodyComponent;
  let fixture: ComponentFixture<SprinklerBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprinklerBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprinklerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
