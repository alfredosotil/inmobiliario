/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FindpropertyComponent } from './findproperty.component';

describe('FindpropertyComponent', () => {
  let component: FindpropertyComponent;
  let fixture: ComponentFixture<FindpropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindpropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
