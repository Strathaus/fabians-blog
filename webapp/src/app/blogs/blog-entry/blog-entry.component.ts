import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBlogEntry } from 'src/app/blogs/models/blog-entry.interface';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.scss'],
})
export class BlogEntryComponent implements OnInit {
  public blogEntry?: IBlogEntry;

  constructor(
    private readonly _blogService: BlogService,
    private readonly _route: ActivatedRoute
  ) {
    this._route.params.subscribe((params) => {
      if (params.id) {
        this._blogService.getBlogEntry(params.id).subscribe((blogEntry) => {
          this.blogEntry = blogEntry;
        });
      }
    });
  }

  ngOnInit(): void {}
}
