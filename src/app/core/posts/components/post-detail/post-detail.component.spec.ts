import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { of } from 'rxjs';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;

  const dummyPost: Post = {
    id: 1,
    userId: 1,
    title: 'Post de prueba',
    body: 'Este es el contenido del post'
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PostService', ['getPostById', 'getCommentsByPostId']);

    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: PostService, useValue: spy }
      ]
    }).compileComponents();

    mockPostService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;

    mockPostService.getPostById.and.returnValue(of(dummyPost));
    mockPostService.getCommentsByPostId.and.returnValue(of([]));

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el título del post', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Post de prueba');
  });

  it('debería mostrar el cuerpo del post', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Este es el contenido del post');
  });
});
