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
    if(!userId){
      return res.status(404).send({error: 404, message: "pelase provide user id", moreInfo: userId});
    }
    const playlists = await prisma.Playlists.findMany({
        where: {
            UserId: userId
        }
    })

    return res.status(200).send(playlists);
})

export default apiRoute;