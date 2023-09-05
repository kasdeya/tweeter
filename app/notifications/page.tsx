import Header from '@/components/Header';
import NotificationsFeed from '@/components/NotificationsFeed';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Notifications = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
