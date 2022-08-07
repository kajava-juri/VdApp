import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>VdApp</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
      </Head>
      <style jsx>{`


        
      `}</style>
      
      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        .myVid{
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
          width: 100%;
      }
      
      .myVid:hover {
          opacity: 0.7;
      }

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background-color: #282c34;
        }
        h1, p {
          color: #fff;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
      <Header />

      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}