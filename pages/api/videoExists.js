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
    const {userId, videoId} = req.body;
    const result = await prisma.$queryRaw`SELECT * FROM get_playlists_for_user_and_video(${userId}::int, ${videoId}::int)`;

    //const exists = playlistVideo == null ? false : true;
    return res.status(200).send({result: result});
})

export default apiRoute;