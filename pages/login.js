import Layout from "../Components/Layout";
import { LoginForm } from "../Components/LoginForm";
import fetchJson, { FetchError } from "../lib/fetchJson";
import React, { useState } from "react";

export default function Login(){


    return(
        <Layout>
            <div>
                <LoginForm errorMessage={""} 
                onSubmit={ async function handleSubmit(event){
                        event.preventDefault();
                    }
                }>
                    
                </LoginForm>
            </div>
        </Layout>
    )
}