import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import FollowButton from '../../components/FollowButton';

interface Params { id: string }

export default async function UserProfile({ params }: { params: Params }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: target } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, followers, following')
    .eq('id', params.id)
    .single();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!target) return <p className="p-6">User not found</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 text-foreground">
      <img
        src={target.avatar_url || '/default-avatar.png'}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover"/>
      <h1 className="text-2xl font-bold mt-4">{target.username}</h1>
      <div className="flex gap-4 mt-2">
        <span>Followers: {target.followers}</span>
        <span>Following: {target.following}</span>
      </div>
      {user && (
        <div className="mt-4">
          <FollowButton targetId={target.id} currentUserId={user.id} />
        </div>
      )}
    </div>
  );
}