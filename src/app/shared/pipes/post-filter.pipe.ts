import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/app/core/posts/models/post.model';

@Pipe({
  name: 'postFilter'
})
export class PostFilterPipe implements PipeTransform {

  transform(posts: Post[], searchTerm: string): Post[] {
    if (!posts || !searchTerm) return posts;

    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
