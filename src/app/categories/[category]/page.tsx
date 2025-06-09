import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import StoryCard from '../../components/StoryCard';

interface Params {
  category: string;
}

type Book = {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  rating?: number;
  reviews?: number;
};

export default async function CategoryPage({ params }: { params: Params }) {
  const categoryParam = decodeURIComponent(params.category);
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore, });

  const { data } = await supabase
    .from('books')
    .select('*')
    .eq('category', categoryParam);

  const books = (data as Book[]) || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-foreground">{categoryParam}</h1>
      {books.length === 0 ? (
        <p className="text-gray-400">No books found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <StoryCard
              key={book.id}
              title={book.title}
              description={book.description}
              price={`$${book.price}`}
              imageUrl={book.image_url}
              rating={book.rating ?? 0}
              reviews={book.reviews ?? 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}