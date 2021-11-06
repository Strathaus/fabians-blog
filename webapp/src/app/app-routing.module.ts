import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    loadChildren: () =>
      import('./blogs/blogs.module').then((m) => m.BlogsModule),
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'suggestions',
    loadChildren: () =>
      import('./suggestions/suggestions.module').then(
        (m) => m.SuggestionsModule
      ),
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
