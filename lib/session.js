// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
export const sessionOptions = {
    cookieName: "vdApp_cookiename",
    password: "eg9X7utGDvei5PTK5gusdHmgubUk1sNA",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "development",
    },
  };