import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateEditSuggestionComponent } from './create-edit-suggestion.component';

describe('CreateEditSuggestionComponent', () => {
  let component: CreateEditSuggestionComponent;
  let fixture: ComponentFixture<CreateEditSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditSuggestionComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
