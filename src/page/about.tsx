import { Link } from "waku"

export const AboutPage = () => (
  <div>
    <h1 className="text-4xl font-bold tracking-tight">About Waku</h1>
    <p>The minimal React framework</p>
    <Link to="/" className="mt-4 inline-block underline">
      Return home
    </Link>
  </div>
)
