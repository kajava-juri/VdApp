import prisma from "../../lib/prisma";

export default async function handler(req, res){
    const maxAmount = 50;
    const order = req.body.orderBy === "asc" ? "asc" : "desc";

    const files = await prisma.Videos.findMany({
        orderBy:{
            Path: order
        },
        where: {
            Path: {
                contains: req.body.search
            }
        },
        take: maxAmount
    });

    if(!files){
        return res.status(500).send({error: "no matches found"});
    }

    return res.status(200).send({ o: order,files: files});
}