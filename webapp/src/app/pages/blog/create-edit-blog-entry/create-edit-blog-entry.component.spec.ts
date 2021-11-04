import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../lib/material.module';

import { CreateEditBlogEntryComponent } from './create-edit-blog-entry.component';

describe('CreateEditBlogEntryComponent', () => {
  let component: CreateEditBlogEntryComponent;
  let fixture: ComponentFixture<CreateEditBlogEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditBlogEntryComponent],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserDynamicTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditBlogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
