import { useEffect, useState } from "react";
import Layout from "../Components/Layout"
import useUser from "../lib/useUser";
import React from 'react';
import ReactPlayer from 'react-player';
import VideoModal from "../Components/VideoModal";
import Router from 'next/router'
import fetchJson from "../lib/fetchJson";
import Link from "next/link";
const path = require('path');
const {resolve} = require('path');

export default function Home({files, page, maxAmount}) {
  const { user } = useUser({
    redirectTo: "",
  });
  
  const [modalOpen, setModalOpen] = useState(false);
  const [vdSource, setVdSource] = useState("");

  function handleFullscreen(video){
    setVdSource(video);
    setModalOpen(true);

  }


  return (
    <Layout>
      
      {user?.isLoggedIn && (
        <div>

        </div>
      )}
      {files && (
        <div>
          <div className="container">
            <div className="row" style={{justifyContent: "center"}}>
              {files.map((file) => {
                if(path.extname(file) == ".gif"){
                  return (
                    <div className="col-md-3" style={{margin: "10px", padding: "15px", minHeight: "410px", border: "1px solid rgba(0,0,0,.125)", borderRadius: "0.25rem", width:"290px"}}>
                      <img height="210" width="100%" className="myVid" src={`videos/${file}`}></img>
                      <p>{file}</p>
                    </div>
                    
                  )
                }
                else{
                  return (
                    <div className="col-md-3" style={{margin: "10px", padding: "15px", minHeight: '410px', border: "1px solid rgba(0,0,0,.125)", borderRadius: "0.25rem", width:"290px"}}>
                      <video src={`videos/${file}`} height="210" width="100%" className="myVid" onClick={() => handleFullscreen(file)}>
                      </video>
                      <p>{file}</p>
                    </div>
                  )
                }
              })}
            </div>
          </div>
          <div style={{marginBottom: "20px"}}>
            <Link href="/?page=1">
              <a>First page</a>
            </Link>

            <button
            onClick={() => Router.push(`/?page=${page - 1}`)}
            disabled={page <= 1}
            > 
            PREV 
            </button>

            <span style={{fontSize: "20px"}}> {page} </span>

            <button onClick={() => Router.push(`/?page=${page + 1}`)}
            disabled={files.length !== maxAmount}>
            NEXT
            </button>
          </div>
          

          <VideoModal open={modalOpen} onClose={() => {setModalOpen(false)}} source={vdSource}>

          </VideoModal>
        </div>
      )}

    </Layout>
  )
}

Home.getInitialProps = async({query: {page = 1}}) => {
  const d = await fetch(`http://localhost:3000/api/getFiles?page=${page}`)
  const f = await d.json();

  return {
    files: f.files,
    maxAmount: f.maxAmount,
    page: parseInt(page, 10)
  }
}