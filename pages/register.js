import Layout from "../Components/Layout";
import { LoginForm } from "../Components/LoginForm";
import fetchJson, { FetchError } from "../lib/fetchJson";
import React, { useState } from "react";
import useUser from "../lib/useUser";

export default function Register(){
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/profile-sg",
    redirectIfFound: true,
  });

    return(
        <Layout>
            <div>
                <LoginForm errorMessage={""} 
                onSubmit={ async function handleSubmit(event){
                        event.preventDefault();

                        const body = {
                            username: event.currentTarget.username.value,
                            password: event.currentTarget.password.value,
                        }

                        console.log(JSON.stringify(body));

                        try{
                            mutateUser(
                                await fetchJson("/api/register", {
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
        </Layout>
    )
}