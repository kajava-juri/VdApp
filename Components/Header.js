import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Header() {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
            <>
            {user?.isLoggedIn === true && (
              <li>
              {/* In this case, we're fine with linking with a regular a in case of no JavaScript */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="#"
              >
                Logout
              </a>
            </li>
            )}

            {user?.isLoggedIn === false && (
              <li>
              {/* In this case, we're fine with linking with a regular a in case of no JavaScript */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="#"
              >
                Login
              </a>
            </li>
            )}

            </>
        </ul>
      </nav>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          margin-right: 3rem;
          display: flex;
        }

        li:first-child {
          margin-left: 40px;
        }

        a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          font-size:20px;
        }

        a img {
          margin-right: 1em;
        }

        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header>
  );
}