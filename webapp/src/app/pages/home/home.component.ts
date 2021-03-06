import { Component, OnInit } from '@angular/core';
import { ITag } from '../../blogs/models/tag.interface';
import { TagsService } from '../../blogs/tags.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public popularTags?: ITag[];

  constructor(private _tagService: TagsService) {}

  ngOnInit(): void {
    this._tagService.getTags().subscribe((res) => {
      this.popularTags = res;
    });
  }
}
