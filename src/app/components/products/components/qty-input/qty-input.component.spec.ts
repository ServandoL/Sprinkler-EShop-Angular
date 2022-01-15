import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtyInputComponent } from './qty-input.component';

describe('QtyInputComponent', () => {
  let component: QtyInputComponent;
  let fixture: ComponentFixture<QtyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtyInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QtyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
