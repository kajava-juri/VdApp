import prisma from '../../lib/prisma';
import nextConnect from 'next-connect';

const apiRoute = nextConnect({
    onError(error, req, res) {
      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.post(async (req, res) => {
    const {userId, playlistName} = req.body;
    const playlist = await prisma.Playlists.create({
        data: {UserId: userId, Name: playlistName}
    });

    return res.status(200).json({user: userId, playlist: playlistName});
})

export default apiRoute;