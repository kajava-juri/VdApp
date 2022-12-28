import axios from 'axios';

const path = require('path');

export default function Media({file, checkboxClick, showDelete, isLoggedIn, onMediaClick, Delete, playlists, handlePlaylistChecked}){

  

  if(path.extname(file.Path) == ".gif"){
      return (
        <div key={file.Id} className="col-md-3" style={{margin: "10px", padding: "15px", minHeight: "410px", border: "1px solid rgba(0,0,0,.125)", borderRadius: "0.25rem", width:"290px"}}>
          {isLoggedIn && (
            <input type="checkbox" className="regular-checkbox big-checkbox" data-filename={file.Path} onClick={checkboxClick} id={file.Id}/>
          )}
          <div className="myVid">
            <img height="210" width="100%" src={`videos/${file.Path}`}></img>
            <p>{file.Path}</p>
          </div>

          {(showDelete && isLoggedIn) && (
            <button onClick={() => Delete(file.Path)}>DELETE</button>
          )}
        </div>
        
      )
    }
    else{
      return (
        <div key={file.Id} className="col-md-3" style={{margin: "10px", padding: "15px", minHeight: '410px', border: "1px solid rgba(0,0,0,.125)", borderRadius: "0.25rem", width:"290px"}}>
          {isLoggedIn && (
            <input type="checkbox" className="regular-checkbox big-checkbox" data-filename={file.Path} onClick={checkboxClick} id={file.Id}/>
          )}

          <div onClick={() => onMediaClick(file.Path)} className="myVid">
            <video src={`videos/${file.Path}`} height="210" width="100%"></video>
            <p>{file.Path}</p>
          </div>

          {(showDelete && isLoggedIn) && (
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <button onClick={() => Delete(file.Path)}>DELETE</button>
              {playlists.length > 0 && (
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Add to playlist
                  </button>
                  <ul class="dropdown-menu">
                    {playlists.map((playlist) => {
                      return(
                        <li>
                          <input className="form-check-input" type="checkbox" value={playlist.Id} id="playlistCheck" onChange={e => handlePlaylistChecked(e, file.Id)}/>
                          <label className="form-check-label" htmlFor="playlistCheck">{playlist.Name}</label>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>

          )}

        </div>
      )
    }
}