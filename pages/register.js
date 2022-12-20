import Layout from "../Components/Layout";
import { LoginForm } from "../Components/LoginForm";
import fetchJson, { FetchError } from "../lib/fetchJson";
import React, { useState } from "react";
import useUser from "../lib/useUser";
import Modal from "../Components/Modal";

//const prisma = new PrismaClient();


export default function Register(){
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser, user } = useUser({
    redirectTo: "/profile",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isAuthorised, setAuthorised] = useState(false);

  async function Compare(e){
    e.preventDefault();

    const body = {
        password: e.currentTarget.password.value,
    }

    try{
        const valid = await fetchJson("/api/validate", {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
        
        setAuthorised(valid);

    } catch(error){
        if (error instanceof FetchError) {
            setErrorMsg(error.data.message);
            console.log(error.data.message);
          } else {
            console.error("An unexpected error happened:", error);
          }
    }
    
  }

  return(
        <Layout>
            {isAuthorised && (
                <div>
                    <LoginForm errorMessage={""} text="Register"
                    onSubmit={ async function handleSubmit(event){
                            event.preventDefault();

                            const body = {
                                username: event.currentTarget.username.value,
                                password: event.currentTarget.password.value,
                            }

                            console.log(JSON.stringify(body));

                            try{
                                await fetchJson("/api/register", {
                                    method:"POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(body),
                                })
                            } catch(error){
                                if (error instanceof FetchError) {
                                    setErrorMsg(error.data.message);
                                } else {
                                    console.error("An unexpected error happened:", error);
                                }
                            }
                        }}
                    />
                    <h2 style={{color:"red"}}>{errorMsg}</h2>
                </div>
            )}
            <Modal open={!isAuthorised}>
                <form onSubmit={Compare}>

                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password"/>

                    <input type="submit" value="Submit"></input>
                    
                </form>

            </Modal>

        </Layout>
    )
}

