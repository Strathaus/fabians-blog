import { LocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../lib/material.module';

import { SuggestionsListComponent } from './suggestions-list.component';

describe('SuggestionsListComponent', () => {
  let component: SuggestionsListComponent;
  let fixture: ComponentFixture<SuggestionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestionsListComponent],
      imports: [MaterialModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
