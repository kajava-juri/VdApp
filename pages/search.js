import Layout from "../Components/Layout";
import useUser from "../lib/useUser";
import React, {useMemo, useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import VideoModal from "../Components/VideoModal";
import Router from 'next/router'
import fetchJson from "../lib/fetchJson";
import Link from "next/link";
import VideoUploadForm from "../Components/VideoUpload";
const path = require('path');
const {resolve} = require('path');
const axios = require('axios').default;
import { debounce } from "lodash";
import { useRouter } from 'next/router'
import Media from "../Components/Media";

export default function Search() {
  const { user } = useUser({
    redirectTo: "",
  });
  const [files, setFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [vdSource, setVdSource] = useState("");
  const [showDelete, setShowDelete] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy ] = useState("desc");
  const router = useRouter();

  useEffect(() => {
    if(selectedFiles.length === 0){
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  }, [selectedFiles]);

  const debouncedSearch = useMemo(() => {
    const searchChange = (e) => {
      if (e.target.value.length === 0) return;
      setSearch(e.target.value);
    }
    return debounce(searchChange, 300);
  }, []);

  const fetchSearch = async () => {
    const response = await axios.post('/api/fileSearch', {search: search, orderBy: orderBy}, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      console.log(response);
      setFiles(response.data.files);
  });
  }

  useEffect(() => {
    if(!search) return;

    fetchSearch();
  }, [search, orderBy])


  function handleFullscreen(video){
    setVdSource(video);
    setModalOpen(true);

  }

  async function handleDeleteClick(filename){
    const response = await axios.post('/api/fileDelete', {filename: filename, isMany: false});
    fetchSearch();
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

  function toggleSortBy(){
    let s = orderBy == "desc" ? "asc" : "desc";
    setOrderBy(s);
    //fetchSearch();
  }

  return (
    <Layout>
      {user?.isLoggedIn && (
        <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", marginBottom: 32}}>
          <VideoUploadForm router={router}/>
          {!showDelete && (
            <div>
              <button onClick={handleDeleteSelected}>Delete selected</button>
            </div>
          )}

        </div>
      )}
        <div>
            <input type={"search"} placeholder="Search..." onChange={debouncedSearch}></input>
            <button className="mx-3" onClick={toggleSortBy}>{orderBy === "desc" ? <>&darr; A → Z</> : <>&uarr; Z → A</>}</button>
        </div>
      {files && (
        <div>
          <div className="container">
            <div className="row" style={{justifyContent: "center"}}>
              {files.map((file) => {
                return <Media file={file} checkboxClick={handleChecked} showDelete={showDelete} isLoggedIn={user?.isLoggedIn} onMediaClick={handleFullscreen} Delete={handleDeleteClick}/>
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