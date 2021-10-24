import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogEntryComponent } from './pages/blog/blog-entry/blog-entry.component';
import { BlogListComponent } from './pages/blog/blog-list/blog-list.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CreateEditBlogEntryComponent } from './pages/blog/create-edit-blog-entry/create-edit-blog-entry.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProjectsComponent } from './pages/projects/projects.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
    children: [
      { path: '', component: BlogListComponent },
      { path: 'new', component: CreateEditBlogEntryComponent },
      { path: 'edit/:id', component: CreateEditBlogEntryComponent },
      { path: ':id', component: BlogEntryComponent },
    ],
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  { path: '**', pathMatch: 'full', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
