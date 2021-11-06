import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private readonly _suggestionsService: SuggestionsService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {}

  submit(): void {
    if (this.suggestionForm.valid) {
      this._suggestionsService
        .submitSuggestion(this.suggestionForm.value)
        .subscribe(() => {
          this._router.navigate(['/suggestions']);
        });
    }
  }
}
