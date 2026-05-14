import { Link } from 'waku';
import { Counter } from 'components/counter';

export default async function Page() {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight">Waku</h1>
      <p>Hello world!</p>
      <Counter />
      <Link to="/about" className="mt-4 inline-block underline">
        About page
      </Link>
    </div>
  );
}
