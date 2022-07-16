import Layout from "../Components/Layout";
import { LoginForm } from "../Components/LoginForm";
import fetchJson, { FetchError } from "../lib/fetchJson";
import React, { useState } from "react";
import useUser from "../lib/useUser";

export default function Login(){
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/profile",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

    return(
        <Layout>
            <div>
                <LoginForm errorMessage={""} text="Log in as admin"
                onSubmit={ async function handleSubmit(event){
                        event.preventDefault();

                        const body = {
                            username: event.currentTarget.username.value,
                            password: event.currentTarget.password.value,
                        }

                        try{
                            mutateUser(
                                await fetchJson("/api/login", {
                                    method:"POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(body),
                                }),
                                false,
                            );
                        } catch(error){
                            if (error instanceof FetchError) {
                                setErrorMsg(error.data.message);
                              } else {
                                console.error("An unexpected error happened:", error);
                              }
                        }
                    }}
                />
            </div>
            <h2 style={{color:"red"}}>{errorMsg}</h2>
        </Layout>
    )
}