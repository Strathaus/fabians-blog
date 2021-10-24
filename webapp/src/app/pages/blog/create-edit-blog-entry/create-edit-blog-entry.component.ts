import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  public _id?: string;

  constructor(
    private readonly _blogService: BlogService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {
    this._route.params.subscribe((params) => {
      if (params.id) {
        this._blogService.getBlogEntry(params.id).subscribe((res) => {
          this._id = res._id;
          this._blogForm.patchValue(res);
        });
      }
    });
  }

  ngOnInit(): void {}

  createOrEditBlogEntry(): void {
    if (this._blogForm.valid) {
      if (!this._id) {
        this._blogService
          .createNewBlogEntry(this._blogForm.value)
          .subscribe((res) => {
            this._router.navigate(['..'], { relativeTo: this._route });
          });
      } else {
        this._blogService
          .editBlogEntry(this._id, this._blogForm.value)
          .subscribe((res) => {
            this._router.navigate(['../..'], { relativeTo: this._route });
          });
      }
    }
  }
}
