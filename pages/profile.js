import React from "react";
import Layout from "../Components/Layout";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";


export default function Profile({userInfo}){
    const { user } = useUser({
        redirectTo: "/login",
      });

      console.log(userInfo);

      return(
        <Layout>
            {user && (<h1>Logged in</h1>)}
        </Layout>
      )

}
