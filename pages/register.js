import Layout from "../Components/Layout";
import { LoginForm } from "../Components/LoginForm";
import fetchJson, { FetchError } from "../lib/fetchJson";
import React, { useState } from "react";
import { PrismaClient } from '@prisma/client';
import useUser from "../lib/useUser";
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();


export default function Register(){
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/profile-sg",
    redirectIfFound: true,
  });



  const [psw, setpsw] = useState();

  async function validate(event){
    event.preventDefault();
    //const contents = readFileSync("./importantPassword", 'utf-8');
    //console.log(contents)

    //const valid = await bcrypt.compare(req.body.password, userData.Password);

  }


  return(
        <Layout>
            {psw && (
                <form onSubmit={validate}>
                    <input type="submit">SUBMIT</input>
                </form>
            )}
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