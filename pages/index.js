import { useEffect, useState } from "react";
import Layout from "../Components/Layout"
import useUser from "../lib/useUser";
import React from 'react';
import ReactPlayer from 'react-player';
import VideoModal from "../Components/VideoModal";
import Router from 'next/router'
import fetchJson from "../lib/fetchJson";
import Link from "next/link";
import VideoUploadForm from "../Components/VideoUpload";
const path = require('path');
const {resolve} = require('path');
const axios = require('axios').default;
import { useRouter } from 'next/router'

export default function Home({files, page, maxAmount}) {
  const { user } = useUser({
    redirectTo: "",
  });
  
  const [modalOpen, setModalOpen] = useState(false);
  const [vdSource, setVdSource] = useState("");

  const router = useRouter();

  function handleFullscreen(video){
    setVdSource(video);
    setModalOpen(true);

  }

  const onChange = async (formData) => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };

    axios.post('/api/fileUploads', formData, config).then(() => router.reload());

    // console.log(response);
  };

  async function handleDeleteClick(filename){
    const response = await axios.post('/api/fileDelete', {filename: filename});
    router.reload();
    console.log(response);
  }
  console.log(files.length);

  return (
    <Layout>
      
      {user?.isLoggedIn && (
        <div>
          <VideoUploadForm
          onChange={onChange}
          />
        </div>
      )}
      {files && (
        <div>
          <div className="container">
            <div className="row" style={{justifyContent: "center"}}>
              {files.map((file) => {
                if(path.extname(file.Path) == ".gif"){
                  return (
                    <div key={file.Id} className="col-md-3" style={{margin: "10px", padding: "15px", minHeight: "410px", border: "1px solid rgba(0,0,0,.125)", borderRadius: "0.25rem", width:"290px"}}>
                      <img height="210" width="100%" className="myVid" src={`videos/${file.Path}`}></img>
                      <p>{file.Path}</p>
                    </div>
                    
                  )
                }
                else{
                  return (
                    <div key={file.Id} className="col-md-3" style={{margin: "10px", padding: "15px", minHeight: '410px', border: "1px solid rgba(0,0,0,.125)", borderRadius: "0.25rem", width:"290px"}}>
                      <video src={`videos/${file.Path}`} height="210" width="100%" className="myVid" onClick={() => handleFullscreen(file.Path)}>
                      </video>
                      <p>{file.Path}</p>
                      <button onClick={() => handleDeleteClick(file.Path)}>DELETE</button>

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
            disabled={files.length < maxAmount}>
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

Home.getInitialProps = async ({query: {page = 1}}) => {
  const res = await fetch(`http://localhost:3000/api/getFiles?page=${page}`);
  const f = await res.json();

  return {
    files: f.files,
    maxAmount: f.maxAmount,
    page: parseInt(page, 10)
  }
}