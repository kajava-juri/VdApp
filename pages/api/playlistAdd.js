import prisma from '../../lib/prisma';
import nextConnect from 'next-connect';
import { parseInt } from 'lodash';

const apiRoute = nextConnect({
    onError(error, req, res) {
      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.post(async (req, res) => {
    const {videoId} = req.body;
    const playlistId = parseInt(req.body.playlistId);
    const playlist = await prisma.PlaylistsVideos.create({
        data: {PlaylistId: playlistId, VideoId: videoId}
    });

    return res.status(200).json(playlist);
})

apiRoute.delete(async (req, res) => {
    const {videoId} = req.body;
    const playlistId = parseInt(req.body.playlistId);
    const deletedPlaylist = await prisma.PlaylistsVideos.deleteMany({
        where: {
            VideoId: videoId,
            PlaylistId: playlistId
        }
    })

    return res.status(200).json({pl: playlistId, vd: videoId});
})

export default apiRoute;