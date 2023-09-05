import Form from '@/components/Form';
import Header from '@/components/Header';
import PostFeed from '@/components/posts/PostFeed';

const MainPage = () => {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  );
};

export default MainPage;
