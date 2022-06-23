import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwResetWidgetComponent } from './pw-reset-widget.component';

describe('PwResetWidgetComponent', () => {
  let component: PwResetWidgetComponent;
  let fixture: ComponentFixture<PwResetWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwResetWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwResetWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
