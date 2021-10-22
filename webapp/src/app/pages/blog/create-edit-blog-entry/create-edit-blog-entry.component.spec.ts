import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditBlogEntryComponent } from './create-edit-blog-entry.component';

describe('CreateEditBlogEntryComponent', () => {
  let component: CreateEditBlogEntryComponent;
  let fixture: ComponentFixture<CreateEditBlogEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditBlogEntryComponent ]
    })
    .compileComponents();
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
