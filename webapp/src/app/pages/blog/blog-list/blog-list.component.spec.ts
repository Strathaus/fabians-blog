import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../lib/material.module';

import { BlogListComponent } from './blog-list.component';

describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogListComponent],
      imports: [MaterialModule, HttpClientModule, RouterTestingModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
