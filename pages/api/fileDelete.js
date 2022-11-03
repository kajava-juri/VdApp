import prisma from "../../lib/prisma";
import { unlink } from "fs";

export default async function handler(req, res){

    try{
        //delete the video path from db
        const response = await prisma.videos.delete({
            where: {
                Path: req.body.filename
            }
        });

        //delete the file from storage
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