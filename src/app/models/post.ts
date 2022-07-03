export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  comments: Comment[];
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
