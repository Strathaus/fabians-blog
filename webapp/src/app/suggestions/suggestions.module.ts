import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';
import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { CreateEditSuggestionComponent } from './create-edit-suggestion/create-edit-suggestion.component';
import { MaterialModule } from '../lib/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuggestionsCommentsComponent } from './suggestions-list/suggestions-comments/suggestions-comments.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    SuggestionsListComponent,
    CreateEditSuggestionComponent,
    SuggestionsCommentsComponent,
  ],
  imports: [
    CommonModule,
    SuggestionsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
})
export class SuggestionsModule {}
