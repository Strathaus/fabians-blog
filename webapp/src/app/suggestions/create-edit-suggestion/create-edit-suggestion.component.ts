import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { SnackbarService } from '../../shared/snackbar-service/snackbar.service';
import { ISuggestion } from '../models/suggestion.interface';
import { SuggestionsService } from '../suggestions.service';

@Component({
  selector: 'app-create-edit-suggestion',
  templateUrl: './create-edit-suggestion.component.html',
  styleUrls: ['./create-edit-suggestion.component.scss'],
})
export class CreateEditSuggestionComponent implements OnInit {
  public suggestionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  public suggestion?: ISuggestion;

  constructor(
    private readonly _suggestionsService: SuggestionsService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _snackbarService: SnackbarService
  ) {
    this._route.params
      .pipe(
        filter((params) => params.id),
        map((params) => params.id),
        switchMap((id) => this._suggestionsService.getSuggestion(id)),
        catchError((err) => {
          this._snackbarService.showSnackbar(
            'The suggestion could not be loaded. Sorry for the inconvenience.'
          );
          this._router.navigate(['../../'], { relativeTo: this._route });
          throw err;
        }),
        tap((suggestion) => {
          this.suggestionForm.patchValue(suggestion);
          this.suggestion = suggestion;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.suggestionForm.valid) {
      if (this.suggestion) {
        this._suggestionsService
          .editSuggestion(this.suggestion._id, this.suggestionForm.value)
          .subscribe(() => {
            this._router.navigate(['/suggestions']);
          });
      } else {
        this._suggestionsService
          .submitSuggestion(this.suggestionForm.value)
          .subscribe(() => {
            this._router.navigate(['/suggestions']);
          });
      }
    }
  }
}
