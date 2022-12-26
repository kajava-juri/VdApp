export default function handler(req, res){
    return res.status(200).send({message: req.body.playlistName});

    //TODO: Create rows in Tables: Playlist and PlaylistsVideos
}