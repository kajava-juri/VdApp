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
    const {playlistId, videoId} = req.body;
    const playlistVideo = await prisma.PlaylistsVideos.findFirst({
        where: {
            AND:[
              {
                PlaylistId: {
                  equals: playlistId
                }
              },
              {
                VideoId: {
                  equals: videoId
                }
              }
            ]

        }
    })

    const exists = playlistVideo == null ? false : true;
    return res.status(200).send({exists: exists});
})

export default apiRoute;