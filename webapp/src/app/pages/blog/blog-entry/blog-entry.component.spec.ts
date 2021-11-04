import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../lib/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BlogEntryComponent } from './blog-entry.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BlogEntryComponent', () => {
  let component: BlogEntryComponent;
  let fixture: ComponentFixture<BlogEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogEntryComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        BrowserDynamicTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
