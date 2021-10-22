import { Component, OnInit } from '@angular/core';
import { IBlogEntry } from 'src/app/models/blog/blog-entry.interface';
import { BlogService } from 'src/app/services/http/blog/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  public blogEntries?: IBlogEntry[];

  constructor(private readonly _blogService: BlogService) {}

  ngOnInit(): void {
    this._blogService.getBlogEntries().subscribe((res) => {
      this.blogEntries = res;
    });
  }
}
