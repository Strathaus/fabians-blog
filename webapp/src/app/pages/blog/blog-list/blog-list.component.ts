import { Component, OnInit } from '@angular/core';
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
  public blogEntries?: IBlogEntry[];

  constructor(
    private readonly _blogService: BlogService,
    public readonly globalStateService: GlobalStateService,
    private readonly _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._blogService.getBlogEntries().subscribe((res) => {
      this.blogEntries = res;
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
