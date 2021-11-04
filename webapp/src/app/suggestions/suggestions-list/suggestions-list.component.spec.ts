import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../lib/material.module';

import { SuggestionsListComponent } from './suggestions-list.component';

describe('SuggestionsListComponent', () => {
  let component: SuggestionsListComponent;
  let fixture: ComponentFixture<SuggestionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestionsListComponent],
      imports: [MaterialModule, HttpClientTestingModule],
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
