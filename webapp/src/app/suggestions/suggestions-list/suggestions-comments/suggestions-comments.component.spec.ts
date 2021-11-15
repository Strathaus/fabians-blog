import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../lib/material.module';

import { SuggestionsCommentsComponent } from './suggestions-comments.component';

describe('SuggestionsCommentsComponent', () => {
  let component: SuggestionsCommentsComponent;
  let fixture: ComponentFixture<SuggestionsCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestionsCommentsComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
