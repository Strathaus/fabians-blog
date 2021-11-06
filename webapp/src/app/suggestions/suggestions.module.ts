import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';
import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { CreateEditSuggestionComponent } from './create-edit-suggestion/create-edit-suggestion.component';
import { MaterialModule } from '../lib/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SuggestionsListComponent, CreateEditSuggestionComponent],
  imports: [
    CommonModule,
    SuggestionsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SuggestionsModule {}
