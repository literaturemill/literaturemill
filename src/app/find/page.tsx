import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import StoryCard from '../components/StoryCard';


type Story = {
  book_id: string;
  title: string;
  description: string;
  price: string;
  image_url: string;
  rating: number;
  reviews: number;
};

export default async function FindPage() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let stories: Story[] = [];

  if (user) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id }),
      cache: 'no-store',
    });

    stories = await res.json();
  } else {
    const { data } = await supabase
      .from('trending_books')
      .select('*')
      .limit(12);

    stories = (data as Story[]) || [];
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-foreground">
        {user ? 'Recommended For You' : 'Popular Stories'}
      </h1>
      {stories.length === 0 ? (
        <p className="text-gray-400">
          No stories available at the moment. Please check back later!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story: Story) => (
            <StoryCard
              key={story.book_id}
              title={story.title}
              description={story.description}
              price={story.price}
              imageUrl={story.image_url}
              rating={story.rating}
              reviews={story.reviews}
            />
          ))}
        </div>
      )}
    </div>
  );
}

