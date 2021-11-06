import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { CreateEditBlogEntryComponent } from './create-edit-blog-entry/create-edit-blog-entry.component';
import { BlogsRoutingModule } from './blogs-routing.module';
import { MaterialModule } from '../lib/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BlogEntryComponent,
    BlogListComponent,
    CreateEditBlogEntryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlogsRoutingModule,
    MaterialModule,
  ],
})
export class BlogsModule {}
