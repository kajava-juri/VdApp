import React from "react";
import Layout from "../Components/Layout";
import useUser from "../lib/useUser";
const axios = require('axios').default;
import { useState } from "react";


export default function Profile({userInfo}){
    const { user } = useUser({
        redirectTo: "/login",
      });

      const [playlistName, setPlaylistName] = useState("");
      function handlePlaylistNameChange(e){
        setPlaylistName(e.target.value);
      }

      async function handleCreatePlaylist(){

        const response = await axios.post('/api/playlistCreate', {playlistName: playlistName});
        console.log(response);
      }

      return(
        <Layout>
            {user && (
            <div>
                <h1>Logged in</h1>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Create new playlist</button>

                <div className="modal modal-dialog modal-dialog-centered fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <label htmlFor="playlistName" className="form-label">Playlist name</label>
                        <input type="text" className="form-control" id="playlistName" placeholder="..." onChange={handlePlaylistNameChange}/>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleCreatePlaylist}>Create</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            )}
        </Layout>
      )

}
