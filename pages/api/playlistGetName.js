import { toInteger } from 'lodash';
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

apiRoute.get(async (req, res) => {
    const userId = toInteger(req.query.userId);
    const playlistId = toInteger(req.query.playlistId);
    if(!userId){
      return res.status(404).send({error: 404, message: "pelase provide user id", moreInfo: userId});
    }
    const playlist = await prisma.Playlists.findUnique({
        where: {
            Id: playlistId
        },
        select:{
          Name: true
        }
    })

    return res.status(200).send(playlist.Name);
})

export default apiRoute;