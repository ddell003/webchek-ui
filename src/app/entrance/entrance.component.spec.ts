import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceComponent } from './entrance.component';

describe('EntranceComponent', () => {
  let component: EntranceComponent;
  let fixture: ComponentFixture<EntranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntranceComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
