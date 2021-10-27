import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBlogEntry } from 'src/app/models/blog/blog-entry.interface';
import { ConfirmationService } from 'src/app/services/confirmation/confirmation.service';
import { GlobalStateService } from 'src/app/services/global-state/global-state.service';
import { BlogService } from 'src/app/services/http/blog/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  public tag?: string;
  public blogEntries?: IBlogEntry[];

  constructor(
    private readonly _blogService: BlogService,
    public readonly globalStateService: GlobalStateService,
    private readonly _confirmationService: ConfirmationService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {
    this._route.queryParams.subscribe((params) => {
      console.log('Query Params Subscription called!');
      this.tag = params.tags;
      this._loadBlogEntries();
    });
  }

  ngOnInit(): void {}

  private _loadBlogEntries(): void {
    this._blogService
      .getBlogEntries(0, this.tag ? [this.tag] : undefined)
      .subscribe((res) => {
        this.blogEntries = res;
      });
  }

  public removeTag(): void {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { tags: null },
      queryParamsHandling: 'merge',
    });
  }

  async removeBlogEntry(index: number, id: string) {
    if (
      await this._confirmationService.confirm({
        text: 'Are you sure you want to delete this blog entry?',
      })
    ) {
      this._blogService.removeBlogEntry(id).subscribe((_) => {
        this.blogEntries?.splice(index, 1);
      });
    }
  }
}
