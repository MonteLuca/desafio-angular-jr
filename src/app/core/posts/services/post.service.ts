import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { Comment } from '../models/coment.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = environment.API_URL;

  constructor( private http: HttpClient ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`).pipe(
      catchError((error) => {
        console.error('Error al obtener los posts: ', error);
        return throwError(() => new Error('Error al obtener los posts'))
      })
    );
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener el post por Id: ', error);
        return throwError(() => new Error('Error al obtener el post por Id'))
      })
    );
  }

  getCommentsByPostId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/posts/${id}/comments`).pipe(
      catchError((error) => {
        console.error('Error al obtener los comentarios: ', error)
        return throwError(() => new Error('Error al obtener los comentarios'))
      })
    );
  }

}
