import Link from 'next/link';
import categories from '../components/categories';

export default function CategoriesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Categories</h1>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat}>
            <Link href={`/categories/${encodeURIComponent(cat)}`} className="text-indigo-400 hover:underline">
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}