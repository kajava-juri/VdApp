import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import useUser from "../lib/useUser";
const axios = require('axios').default;
import { useState } from "react";
import { useRouter } from "next/router";
import Media from "../Components/Media";
import Link from "next/link";
import VideoModal from "../Components/VideoModal";


export default function Profile({page, files, maxAmount}){
    const { user } = useUser({
        redirectTo: "/login",
    });
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [vdSource, setVdSource] = useState("");
    const [showDelete, setShowDelete] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);
  
    useEffect(() => {
      if(selectedFiles.length === 0){
        setShowDelete(true);
      } else {
        setShowDelete(false);
      }
    }, [selectedFiles]);
  
    function handleFullscreen(video){
      setVdSource(video);
      setModalOpen(true);
  
    }
  
    async function handleDeleteClick(filename){
      const response = await axios.post('/api/fileDelete', {filename: filename, isMany: false});
      router.reload();
    }
  
    function handleChecked(e){
      if(e.target.checked){
        setSelectedFiles([...selectedFiles, e.target.dataset.filename]);
      } else {
        setSelectedFiles(selectedFiles.filter(f => f !== e.target.dataset.filename));
      }
  
    }
  
    async function handleDeleteSelected(){
      const response = await axios.post('/api/fileDelete', {filenames: selectedFiles, isMany: true});
      console.log(response);
      router.reload();
    }
  
    const [playlists, setPlatylists] = useState([]);
  
    async function fetchPlaylists(){
      const response = await axios.get("/api/playlistGetAll", {userId: user.userId});
      setPlatylists(response.data);
      //console.log(response.data);
    }
  
    useEffect(()=>{
      if(user?.isLoggedIn){
        fetchPlaylists();
      }
    }, [user])
  
    async function handlePlaylistChecked(e, videoId){
      let response
      if(e.target.checked){
        response = await axios.post("/api/playlistAdd", {playlistId: e.target.value, videoId: videoId});
      } else {
        response = await axios.delete("/api/playlistAdd", {data: {playlistId: e.target.value, videoId: videoId}});
      }
      console.log(response);
    }

      return(
        <Layout>
            <div>
                <button><a href="/search">Search</a></button>
            </div>
            {files && (
        <div>
          <div className="container">
            <div className="row" style={{justifyContent: "center"}}>
              {files.map((file) => {
                return <Media handlePlaylistChecked={handlePlaylistChecked} playlists={playlists} file={file} checkboxClick={handleChecked} showDelete={showDelete} isLoggedIn={user?.isLoggedIn} onMediaClick={handleFullscreen} Delete={handleDeleteClick}/>
              })}
            </div>
          </div>
          <div style={{marginBottom: "20px"}}>
            <Link href="/?page=1">
              First page
            </Link>

            <button
            onClick={() => {router.push(`/?page=${page - 1}`);}}
            disabled={page <= 1}
            > 
            PREV 
            </button>

            <span style={{fontSize: "20px"}}> {page} </span>

            
            <button onClick={() => {router.push(`/?page=${page + 1}`);}}
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

// This gets called on every request
export async function getServerSideProps({query: {page = 1, playlistId}}) {
    const res = await axios.get(`http://localhost:3000/api/filesGetFromPlaylist?page=${page}&playlistId=${playlistId}`);
    return {
        props: {
            files: res.data.files,
            playlistId: parseInt(playlistId, 10),
            maxAmount: res.data.maxAmount,
            page: parseInt(page, 10)
        }

    }
}