import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import useUser from "../lib/useUser";
const axios = require('axios').default;
import { useState } from "react";
import { useRouter } from "next/router";
import { fetchPlaylists } from "../utils/fetchPlaylists";


export default function Profile({ userInfo }) {
  const { user } = useUser({
    redirectTo: "/login",
  });

  const router = useRouter();

  const [playlists, setPlatylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  function handlePlaylistNameChange(e) {
    setPlaylistName(e.target.value);
  }



  useEffect(() => {
    async function fetchData() {
      if (user?.isLoggedIn) {
        console.log(user);
        const playlistData = await fetchPlaylists(user.userId);
        if (playlistData) {
          console.log(playlistData);
          setPlatylists(playlistData);
        }
      }
    }
    fetchData();
  }, [user])

  async function handleCreatePlaylist() {
    const response = await axios.post('/api/playlistCreate', { playlistName: playlistName, userId: user.userId });
    console.log(response);
    router.reload();
  }

  async function handleGotoPlaylist(playlistId) {
    router.push(`/playlist?playlistId=${playlistId}`);
  }

  return (
    <Layout>
      {user && (
        <div className="my-5">

          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Create new playlist</button>

          <div>
            {playlists && (
              <div className="row" style={{ marginTop: 32 }}>
                {playlists.map((playlist) => {
                  return (
                    <div className="col-2 d-flex justify-content-center align-items-center border rounded mx-3 my-3 playlist" style={{ height: 128 }} onClick={() => handleGotoPlaylist(playlist.Id)}>
                      <p style={{ fontSize: 24 }}>{playlist.Name}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="modal modal-dialog modal-dialog-centered fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <label htmlFor="playlistName" className="form-label">Playlist name</label>
                  <input type="text" className="form-control" id="playlistName" placeholder="..." onChange={handlePlaylistNameChange} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleCreatePlaylist}>Create</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}