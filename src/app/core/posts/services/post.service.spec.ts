import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { Post } from '../models/post.model';

import { environment } from 'src/environments/environment';
import { Comment } from '../models/coment.model';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // asegura que no quede ningún request sin resolver
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista de posts', () => {
    const dummyPosts: Post[] = [
      { id: 1, userId: 1, title: 'Post 1', body: 'Contenido 1' },
      { id: 2, userId: 1, title: 'Post 2', body: 'Contenido 2' }
    ];

    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('debería obtener un post por ID', () => {
    const dummyPost: Post = {
      id: 1,
      userId: 1,
      title: 'Post de prueba',
      body: 'Contenido de prueba'
    };

    service.getPostById(1).subscribe((post) => {
      expect(post).toEqual(dummyPost);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPost);
  });

  it('debería obtener comentarios de un post por ID', () => {
    const dummyComments: Comment[] = [
      {
        postId: 1,
        id: 1,
        name: 'Comentario 1',
        email: 'test@example.com',
        body: 'Muy buen post'
      }
    ];

    service.getCommentsByPostId(1).subscribe((comments) => {
      expect(comments.length).toBe(1);
      expect(comments).toEqual(dummyComments);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/posts/1/comments`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyComments);
  });
});
