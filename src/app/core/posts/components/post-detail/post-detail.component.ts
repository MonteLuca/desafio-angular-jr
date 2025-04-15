import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Comment } from '../../models/coment.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: Post | null = null;
  comments: Comment[] = [];
  loading = true

  postError: string = '';
  commentsError: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.postService.getPostById(id).subscribe({
      next: (data) => {
        this.post = data
        this.checkIfDoneLoading()
      },
      error: (err) => {
        this.postError = err.message;
        this.checkIfDoneLoading()
      }
    })

    this.postService.getCommentsByPostId(id).subscribe({
      next: (data) => {
        this.comments = data
        this.checkIfDoneLoading()
      },
      error: (err) => {
        this.commentsError = err.message;
        this.checkIfDoneLoading()
      }
    })

  }

  private loaded = {
    post: false,
    comments: false,
  };

  private checkIfDoneLoading(): void {
    if (!this.loaded.post) {
      this.loaded.post = true;
    } else if (!this.loaded.comments) {
      this.loaded.comments = true;
    }

    if (this.loaded.post && this.loaded.comments) {
      this.loading = false;
    }
  }

}
