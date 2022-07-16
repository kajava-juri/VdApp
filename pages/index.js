import { useState } from "react";
import Layout from "../Components/Layout"
import useUser from "../lib/useUser";
import React from 'react';
import ReactPlayer from 'react-player';

export default function Home() {
  const { user } = useUser({
    redirectTo: "/login",
  });
  const url = ""

  return (
    <Layout>
      {user?.isLoggedIn && "logged in"}
      <div>
        <div style={{backgroundColor: "red", height: "500px",width: "50px"}}></div>
        <div style={{backgroundColor: "red", height: "500px",width: "50px"}}></div>
        <div style={{backgroundColor: "red", height: "500px",width: "50px"}}></div>
      </div>
    </Layout>
  )
}
