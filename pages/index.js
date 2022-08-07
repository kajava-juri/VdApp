import { useEffect, useState } from "react";
import Layout from "../Components/Layout"
import useUser from "../lib/useUser";
import React from 'react';
import ReactPlayer from 'react-player';
import VideoModal from "../Components/VideoModal";
const path = require('path');
const {resolve} = require('path');


export default function Home({files}) {
  const { user } = useUser({
    redirectTo: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [vdSource, setVdSource] = useState("");

  function handleFullscreen(video){
    setVdSource(video);
    setModalOpen(true);
    console.log(modalOpen);

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
                      <video height="210" width="100%" className="myVid" onClick={() => handleFullscreen(file)}>
                        <source src={`videos/${file}`}></source>
                      </video>
                      <p>{file}</p>
                    </div>
                  )
                }
              })}
            </div>
          </div>

          <VideoModal open={modalOpen} onClose={() => {setModalOpen(false)}} source={vdSource}>

          </VideoModal>
        </div>
      )}

    </Layout>
  )
}

export async function getStaticProps() {
  const fs = require("fs");


  const files = fs.readdirSync("public/videos/");
  return {
    props: {files}, // will be passed to the page component as props
  }
}
