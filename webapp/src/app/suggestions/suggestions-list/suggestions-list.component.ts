import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISuggestion } from '../models/suggestion.interface';
import { SuggestionsService } from '../suggestions.service';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrls: ['./suggestions-list.component.scss'],
})
export class SuggestionsListComponent implements OnInit {
  public $suggestions = new BehaviorSubject<ISuggestion[] | null>(null);

  constructor(private readonly _suggestionService: SuggestionsService) {}

  ngOnInit(): void {
    this._suggestionService.getSuggestions().subscribe(this.$suggestions);
  }
}
