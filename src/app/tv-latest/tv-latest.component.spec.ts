/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TvLatestComponent } from './tv-latest.component';

describe('TvLatestComponent', () => {
  let component: TvLatestComponent;
  let fixture: ComponentFixture<TvLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
