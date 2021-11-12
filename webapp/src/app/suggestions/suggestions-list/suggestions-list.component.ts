import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationService } from '../../services/confirmation/confirmation.service';
import { GlobalStateService } from '../../services/global-state/global-state.service';
import { ISuggestion } from '../models/suggestion.interface';
import { SuggestionsService } from '../suggestions.service';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrls: ['./suggestions-list.component.scss'],
})
export class SuggestionsListComponent implements OnInit {
  public $suggestions = new BehaviorSubject<ISuggestion[] | null>(null);

  constructor(
    private readonly _suggestionService: SuggestionsService,
    public readonly globalStateService: GlobalStateService,
    private readonly _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._suggestionService.getSuggestions().subscribe(this.$suggestions);
  }

  deleteSuggestion(index: number, id: string): void {
    this._confirmationService
      .confirm({ text: `Are you sure you want to delete this suggestion? ` })
      .then((res) => {
        if (res) {
          this._suggestionService.deleteSuggestion(id).subscribe((_) => {
            const suggestions = this.$suggestions.value;
            suggestions?.splice(index, 1);
            this.$suggestions.next(suggestions);
          });
        }
      });
  }

  likeClick(index: number, suggestion: ISuggestion): void {
    const replaceSuggestion = (likes: number): void => {
      const suggestions = this.$suggestions.value as ISuggestion[];
      suggestions[index].likes = likes;
      suggestions[index].liked = !suggestion.liked;
      this.$suggestions.next(suggestions);
    };
    if (suggestion.liked) {
      this._suggestionService
        .removeLike(suggestion._id)
        .subscribe(replaceSuggestion);
    } else {
      this._suggestionService.like(suggestion._id).subscribe(replaceSuggestion);
    }
  }
}
