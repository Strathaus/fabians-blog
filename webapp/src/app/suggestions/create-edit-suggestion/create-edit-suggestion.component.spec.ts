import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSuggestionComponent } from './create-edit-suggestion.component';

describe('CreateEditSuggestionComponent', () => {
  let component: CreateEditSuggestionComponent;
  let fixture: ComponentFixture<CreateEditSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditSuggestionComponent ]
    })
    .compileComponents();
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
