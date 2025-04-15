import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from './post-list.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PostFilterPipe } from 'src/app/shared/pipes/post-filter.pipe';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;

  const dummyPosts: Post[] = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Contenido 1' },
    { id: 2, userId: 1, title: 'Post 2', body: 'Contenido 2' }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PostService', ['getPosts']);

    await TestBed.configureTestingModule({
      declarations: [PostListComponent, PostFilterPipe],
      providers: [{ provide: PostService, useValue: spy }],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    mockPostService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    mockPostService.getPosts.and.returnValue(of(dummyPosts));

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería mostrar una lista de posts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('ul li');

    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toContain('Post 1');
    expect(listItems[1].textContent).toContain('Post 2');
  });
});
