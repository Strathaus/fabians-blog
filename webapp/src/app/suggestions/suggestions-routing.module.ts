import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditSuggestionComponent } from './create-edit-suggestion/create-edit-suggestion.component';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SuggestionsListComponent,
  },
  {
    path: 'new',
    component: CreateEditSuggestionComponent,
  },
  {
    path: 'edit/:id',
    component: CreateEditSuggestionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestionsRoutingModule {}
