import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/http/blog/blog.service';
import { ITag } from '../../../models/blog/tag.interface';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  concatAll,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';
import { TagsService } from '../../../services/http/tags/tags.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-edit-blog-entry',
  templateUrl: './create-edit-blog-entry.component.html',
  styleUrls: ['./create-edit-blog-entry.component.scss'],
})
export class CreateEditBlogEntryComponent implements OnInit {
  public tagsCtrl = new Subject<string>();
  public tags: string[] = [];
  public _blogForm = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
  });
  public _id?: string;
  public tagsAutoCompl = new Subject<ITag[]>();
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('tagsInput') private _tagsInput?: ElementRef<HTMLInputElement>;

  constructor(
    private readonly _blogService: BlogService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _tagsService: TagsService
  ) {
    this._route.params.subscribe((params) => {
      if (params.id) {
        this._blogService.getBlogEntry(params.id).subscribe((res) => {
          this._id = res._id;
          this._blogForm.patchValue(res);
        });
      }
    });
    this.tagsCtrl
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        map((item: string | undefined) => (item ? item.trim() : undefined)),
        map((text: string | undefined) => this._tagsService.getTags(text)),
        concatAll()
      )
      .subscribe(this.tagsAutoCompl);
    this.tagsCtrl.next('');
  }

  ngOnInit(): void {}

  createOrEditBlogEntry(): void {
    if (this._blogForm.valid) {
      if (!this._id) {
        this._blogService
          .createNewBlogEntry({ ...this._blogForm.value, tags: this.tags })
          .subscribe((_) => {
            this._router.navigate(['..'], { relativeTo: this._route });
          });
      } else {
        this._blogService
          .editBlogEntry(this._id, { ...this._blogForm.value, tags: this.tags })
          .subscribe((_) => {
            this._router.navigate(['../..'], { relativeTo: this._route });
          });
      }
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }

    this.tagsCtrl.next('');
    event.input.value = '';
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);
    this.tagsCtrl.next('');
    this._tagsInput && (this._tagsInput.nativeElement.value = '');
  }
}
