import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentModelComponent } from './comment-model.component';

describe('CommentModelComponent', () => {
  let component: CommentModelComponent;
  let fixture: ComponentFixture<CommentModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
