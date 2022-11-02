import prisma from "../../lib/prisma";
import { unlink } from "fs";

export default async function handler(req, res){

    try{
        const response = await prisma.videos.delete({
            where: {
                Path: req.body.filename
            }
        });

        unlink(`./public/videos/${req.body.filename}`, (err) => {
            if(err){
                return res.status(500).send({response: "error", message: err});
            }
        })

        return res.send({response: "success", message: "file was deleted"});
    } catch (e){
        return res.status(500).send({response: "error", message: e.message})
    }
}