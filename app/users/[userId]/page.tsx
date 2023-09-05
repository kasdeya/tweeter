'use client';
import Header from '@/components/Header';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

const UserView = () => {
  const router = useRouter();
  const parts = usePathname().split('/');
  const userId = parts[parts.length - 1];

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <>
      <Header label={fetchedUser?.name} showBackArrow />
      <UserHero userId={userId} />
      <UserBio userId={userId} />
    </>
  );
};

export default UserView;
