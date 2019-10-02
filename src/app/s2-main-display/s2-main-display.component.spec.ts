import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { S2MainDisplayComponent } from './s2-main-display.component';

describe('S2MainDisplayComponent', () => {
  let component: S2MainDisplayComponent;
  let fixture: ComponentFixture<S2MainDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S2MainDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S2MainDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
