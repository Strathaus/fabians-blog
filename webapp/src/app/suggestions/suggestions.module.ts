import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionsComponent } from './suggestions.component/suggestions.component';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';
import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { CreateEditSuggestionComponent } from './create-edit-suggestion/create-edit-suggestion.component';
import { MaterialModule } from '../lib/material.module';

@NgModule({
  declarations: [
    SuggestionsComponent,
    SuggestionsListComponent,
    CreateEditSuggestionComponent,
  ],
  imports: [CommonModule, SuggestionsRoutingModule, MaterialModule],
})
export class SuggestionsModule {}
