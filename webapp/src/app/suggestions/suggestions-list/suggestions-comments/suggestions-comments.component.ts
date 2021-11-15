import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { GlobalStateService } from '../../../services/global-state/global-state.service';
import { IComment } from '../../models/comment.interface';
import { SuggestionCommentsService } from '../../suggestion-comments.service';

@Component({
  selector: 'app-suggestions-comments',
  templateUrl: './suggestions-comments.component.html',
  styleUrls: ['./suggestions-comments.component.scss'],
})
export class SuggestionsCommentsComponent implements OnInit {
  public commentForm = new FormGroup({
    text: new FormControl('', Validators.required),
  });

  public comments: IComment[] = [];

  @Input()
  public suggestiondId!: string;

  @Input()
  public commentCount: number = 0;

  @Input()
  set opened(opened: boolean) {
    this._opened = opened;
    if (this._opened) {
      this._suggestionsCommentsService
        .getComments(this.suggestiondId)
        .pipe(tap((comments) => (this.comments = comments)))
        .subscribe();
    } else {
      this.comments = [];
    }
  }

  get opened() {
    return this._opened;
  }

  @HostBinding('class.opened')
  private _opened: boolean = false;

  constructor(
    public globalStateService: GlobalStateService,
    private readonly _suggestionsCommentsService: SuggestionCommentsService
  ) {}

  ngOnInit(): void {}

  loadMoreComments(): void {
    this._suggestionsCommentsService
      .getComments(this.suggestiondId, this.comments.length)
      .subscribe((comments) => {
        this.comments.push(...comments);
        this.comments = this.comments.slice();
      });
  }

  submit() {
    if (this.commentForm.valid) {
      this._suggestionsCommentsService
        .submitComment(this.suggestiondId, this.commentForm.value)
        .subscribe((res) => {
          this.commentForm.reset();
          this.comments?.unshift(res);
          this.comments = this.comments.slice();
        });
    }
  }
}
