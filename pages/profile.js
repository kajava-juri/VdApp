import React from "react";
import Layout from "../Components/Layout";
import useUser from "../lib/useUser";


export default function Profile(){
    const { user } = useUser({
        redirectTo: "/login",
      });

      return(
        <Layout>
            This is your Profile.
        </Layout>
      )

}