import prisma from "../../lib/prisma";

export default async function handler(req, res){
    const maxAmount = 8;
    const { page } = await req.query;

    let toSkip = (page-1) * maxAmount;
    let toTake = parseInt(toSkip, 10) + parseInt(maxAmount, 10);

    const files = await prisma.Videos.findMany({
        skip: toSkip,
        take: toTake
    });

    return res.json({files: files, maxAmount: maxAmount, total: files.length});
}