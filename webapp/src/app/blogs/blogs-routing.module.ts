import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { CreateEditBlogEntryComponent } from './create-edit-blog-entry/create-edit-blog-entry.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BlogListComponent },
  { path: 'new', component: CreateEditBlogEntryComponent },
  { path: 'edit/:id', component: CreateEditBlogEntryComponent },
  { path: ':id', component: BlogEntryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogsRoutingModule {}
