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

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService
      .getPosts()
      .pipe(tap((res) => (this.posts = res)))
      .subscribe({
        next: (res) => res.forEach((p) => this.getComments(p)),
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }

  getComments(post: Post) {
    post.comments = [];
    this.postService.getCommentsForPosts(post.id).subscribe({
      next: (res) => res.forEach((comment: any) => post.comments.push(comment)),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  searchByUserId(userId: number) {
    if (userId !== undefined && userId !== null) {
      this.postService
        .getPostsByUserId(userId)
        .pipe(tap((res) => (this.posts = res)))
        .subscribe({
          next: (res) => res.forEach((p) => this.getComments(p)),
          error: (e) => console.error(e),
          complete: () => console.info('complete'),
        });
    }
    if (userId === null) {
      this.getPosts();
    }
  }
}
