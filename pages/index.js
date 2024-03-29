import Layout from "../Components/Layout";
import useUser from "../lib/useUser";
import React, { useMemo, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import VideoModal from "../Components/VideoModal";
import Router from 'next/router'
import fetchJson from "../lib/fetchJson";
import Link from "next/link";
import VideoUploadForm from "../Components/VideoUpload";
const path = require('path');
const { resolve } = require('path');
const axios = require('axios').default;
import { debounce, sortBy } from "lodash";
import { useRouter } from 'next/router'
import Media from "../Components/Media";
import { fetchPlaylists } from "../utils/fetchPlaylists";

export default function Home({ files, page, maxAmount }) {
  const { user } = useUser({
    redirectTo: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [vdSource, setVdSource] = useState("");
  const [showDelete, setShowDelete] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (selectedFiles.length === 0) {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  }, [selectedFiles]);

  function handleFullscreen(video) {
    setVdSource(video);
    setModalOpen(true);

  }

  async function handleDeleteClick(filename) {
    const response = await axios.post('/api/fileDelete', { filename: filename, isMany: false });
    router.reload();
  }

  function handleChecked(e) {
    if (e.target.checked) {
      setSelectedFiles([...selectedFiles, e.target.dataset.filename]);
    } else {
      setSelectedFiles(selectedFiles.filter(f => f !== e.target.dataset.filename));
    }

  }

  async function handleDeleteSelected() {
    const response = await axios.post('/api/fileDelete', { filenames: selectedFiles, isMany: true });
    console.log(response);
    router.reload();
  }

  const [playlists, setPlatylists] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (user?.isLoggedIn) {
        const playlistsData = await fetchPlaylists(user.userId);
        if (playlistsData) {
          setPlatylists(playlistsData);
        }
      }
    }
    fetchData();
  }, [user])



  return (
    <Layout>
      {user?.isLoggedIn && (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", marginBottom: 32 }}>
          <VideoUploadForm router={router} />
          {!showDelete && (
            <div>
              <button onClick={handleDeleteSelected}>Delete selected</button>
            </div>
          )}

        </div>
      )}
      <div>
        <button><a href="/search">Search</a></button>
      </div>
      {files && (
        <div>
          <div className="container">
            <div className="row" style={{ justifyContent: "center" }}>
              {files.map((file) => {
                return <Media userId={user?.userId} playlists={playlists} file={file} checkboxClick={handleChecked} showDelete={showDelete} isLoggedIn={user?.isLoggedIn} onMediaClick={handleFullscreen} Delete={handleDeleteClick} />
              })}
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Link href="/?page=1">
              First page
            </Link>

            <button
              onClick={() => { setSelectedFiles([]); Router.push(`/?page=${page - 1}`); }}
              disabled={page <= 1}
            >
              PREV
            </button>

            <span style={{ fontSize: "20px" }}> {page} </span>


            <button onClick={() => { setSelectedFiles([]); Router.push(`/?page=${page + 1}`); }}
              disabled={files.length < maxAmount}>
              NEXT
            </button>

          </div>


          <VideoModal open={modalOpen} onClose={() => { setModalOpen(false) }} source={vdSource}>

          </VideoModal>
        </div>
      )}

    </Layout>
  );
}

Home.getInitialProps = async ({ query: { page = 1 } }) => {
  const res = await fetch(`http://localhost:3000/api/getFiles?page=${page}`).then(res => res.json());
  //console.log(res);


  return {
    files: res.files,
    maxAmount: res.maxAmount,
    page: parseInt(page, 10)
  }
}