import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
  }

  getCommentsForPosts(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
  }

  getAllComments() {
    return this.http.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/comments`
    );
  }

  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
  }
}
