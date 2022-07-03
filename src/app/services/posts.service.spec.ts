import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('PostsService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postsService: PostsService;

  const POSTS = [
    {
      id: 1,
      title: 'body 1',
      body: 'title 1',
      userId: 1,
      comments: [],
    },
    {
      id: 2,
      title: 'body 2',
      body: 'title 2',
      userId: 1,
      comments: [],
    },
    {
      id: 3,
      title: 'body 3',
      body: 'title 3',
      userId: 2,
      comments: [],
    },
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    postsService = new PostsService(httpClientSpy);
  });

  it('should be created', () => {
    expect(postsService).toBeTruthy();
  });

  it('should return posts', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(POSTS));
    postsService.getPosts().subscribe({
      next: (posts) => {
        expect(posts).toEqual(POSTS);
        done();
      },
      error: () => {
        done.fail;
      },
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
