import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './lib/material.module';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectComponent } from './pages/projects/project/project.component';
import { CreateEditProjectComponent } from './pages/projects/create-edit-project/create-edit-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { SharedModule } from './shared/shared.module';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    ToolbarComponent,
    SidenavComponent,
    ProjectsComponent,
    ProjectComponent,
    CreateEditProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
