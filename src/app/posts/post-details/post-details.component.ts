import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post!: Post;
  userName!: string;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.getPostById(this.route.snapshot?.params['id']);
  }

  getPostById(id: number) {
    this.postService
      .getPostById(id)
      .pipe(tap((res) => (this.post = res)))
      .subscribe({
        next: (res) => this.getUserById(res.userId),
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }

  getUserById(userId: number) {
    this.postService
      .getUserById(userId)
      .subscribe((res) => (this.userName = res.name));
  }
}
