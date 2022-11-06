import prisma from "../../lib/prisma";

export default async function handler(req, res){
    const maxAmount = 50;
    //const { page } = await req.query;

    //let toSkip = (page-1) * maxAmount;
    //let toTake = parseInt(toSkip, 10) + parseInt(maxAmount, 10);

    const files = await prisma.Videos.findMany({
        where: {
            Path: {
                contains: req.body.search
            }
        },
        take: 10
    });

    if(!files){
        return res.status(500).send({error: "no matches found"});
    }

    return res.status(200).send({files: files});
}