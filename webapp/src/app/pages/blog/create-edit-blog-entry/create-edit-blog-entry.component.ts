import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/http/blog/blog.service';

@Component({
  selector: 'app-create-edit-blog-entry',
  templateUrl: './create-edit-blog-entry.component.html',
  styleUrls: ['./create-edit-blog-entry.component.scss'],
})
export class CreateEditBlogEntryComponent implements OnInit {
  public _blogForm = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
  });

  constructor(
    private readonly _blogService: BlogService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {}

  createBlogEntry(): void {
    if (this._blogForm.valid) {
      this._blogService
        .createNewBlogEntries(this._blogForm.value)
        .subscribe((res) => {
          this._router.navigate(['.', '..']);
        });
    }
  }
}
