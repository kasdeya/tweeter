'use client';
import usePost from '@/hooks/usePost';
import { ClipLoader } from 'react-spinners';
import { useRouter, usePathname } from 'next/navigation';
import Header from '@/components/Header';
import PostItem from '@/components/posts/PostItem';
import Form from '@/components/Form';
import CommentFeed from '@/components/posts/CommentFeed';

const PostView = () => {
  const router = useRouter();
  const parts = usePathname().split('/');
  const postId = parts[parts.length - 1];

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader />
      </div>
    );
  }
  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form postId={postId} isComment placeholder="Tweet your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
