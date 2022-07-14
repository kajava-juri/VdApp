import React, { useState } from 'react';


export function LoginForm({errorMessage, onSubmit}){

    const initialValues = {
        username: "", 
        password: ""
    };
    let [loginValues, setLoginValues] = useState(initialValues);

    const handleInputChange = (e) => {
        //const name = e.target.name 
        //const value = e.target.value 
        const { name, value } = e.target;
    
        setLoginValues({
          ...loginValues,
          [name]: value,
        });

    };

   return(
        <div>
            <style jsx>{`
                div {
                    border-radius: 5px;
                    background-color: #f2f2f2;
                    padding: 20px;
                    max-width: 800px;

                    display: flex;
                    flex-flow: column;
                    align-self: center;
                    flex-wrap: wrap;
                }

                input[type=text], input[type=email], input[type=password], select {
                    width: 100%;
                    padding: 12px 20px;
                    margin: 8px 0;
                    display: inline-block;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
                }
                
                input[type=submit] {
                    width: 100%;
                    background-color: #4CAF50;
                    color: white;
                    padding: 14px 20px;
                    margin: 8px 0;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                input[type=submit]:hover {
                    background-color: #45a049;
                }
            `}</style>
            <h2>Log in as admin</h2>
            <form onSubmit={onSubmit}>

                <label htmlFor="username">Login: </label>
                <input type="text" name="username"  onChange={handleInputChange}/>

                <label htmlFor="password">Password: </label>
                <input type="password" name="password"  onChange={handleInputChange}/>

                <input type="submit" value="Submit"></input>

                {errorMessage && <p className="error">{errorMessage}</p>}
                
            </form>
        </div>
    )
}