import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MemberList from '../pages/member/MemberList';
import MemberInfo from '../pages/member/MemberInfo';
import MemberJoin from '../pages/member/MemberJoin';
import MemberLogin from '../pages/member/MemberLogin';
import MemberUpdate from '../pages/member/MemberUpdate';
import PostWrite from '../pages/post/PostWrite';
import PostList from '../pages/post/PostList';
import PostRead from '../pages/post/PostRead';
import PostUpdate from '../pages/post/PostUpdate';

const router = createBrowserRouter ([
  {
    path: "/members/member-list",
    element: <MemberList />
  },
  {
    path: "/members/member-info/:id",
    element: <MemberInfo />
  },
  {
    path: "/members/member-join",
    element: <MemberJoin />
  },
  {
    path: "/members/member-login",
    element: <MemberLogin />
  },
  {
    path: "/members/member-update/:id",
    element: <MemberUpdate />
  },
  {
    path: "/posts/write",
    element: <PostWrite />
  },
  {
    path: "/posts/list",
    element: <PostList />
  },
  {
    path: "/posts/read/:id",
    element: <PostRead />
  },
  {
    path: "/posts/update/:id",
    element: <PostUpdate />
  }
])

export default router;