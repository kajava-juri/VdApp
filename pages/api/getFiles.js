const fs = require("fs");

export default async function handler(req, res){
    const maxAmount = 8;
    const { page } = await req.query;
    const files = fs.readdirSync("public/videos/");
    let toSkip = (page-1) * maxAmount;
    let toTake = parseInt(toSkip, 10) + parseInt(maxAmount, 10);
    res.json({files: files.slice(toSkip, toTake), maxAmount: maxAmount, total: files.length});
    return;


}