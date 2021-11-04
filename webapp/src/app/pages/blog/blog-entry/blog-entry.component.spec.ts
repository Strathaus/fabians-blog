import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../lib/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BlogEntryComponent } from './blog-entry.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';

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
        NoopAnimationsModule,
      ],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
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
