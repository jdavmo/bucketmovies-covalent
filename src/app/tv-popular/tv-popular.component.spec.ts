/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TvPopularComponent } from './tv-popular.component';

describe('TvPopularComponent', () => {
  let component: TvPopularComponent;
  let fixture: ComponentFixture<TvPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
