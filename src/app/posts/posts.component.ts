import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts!: Post[];
  filterValue: any;
  comments!: Comment[];

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.getCommentsAll();
    this.getPosts();
  }

  getPosts() {
    this.postService
      .getPosts()
      .pipe(tap((res) => (this.posts = res)))
      .subscribe({
        next: (res) => res.forEach((p) => this.getCommentsForPost(p)),
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }

  getCommentsAll() {
    this.postService.getAllComments().subscribe((res) => (this.comments = res));
  }

  getCommentsForPost(post: Post) {
    post.comments = [];

    this.comments.filter((comment: any) => {
      if (comment.postId === post.id) {
        post.comments.push(comment);
      }
    });
  }

  searchByUserId(userId: number) {
    if (userId !== undefined && userId !== null) {
      this.postService
        .getPostsByUserId(userId)
        .pipe(tap((res) => (this.posts = res)))
        .subscribe({
          next: (res) => res.forEach((p) => this.getCommentsForPost(p)),
          error: (e) => console.error(e),
          complete: () => console.info('complete'),
        });
    }
    if (userId === null) {
      this.getPosts();
    }
  }
}
