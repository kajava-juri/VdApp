import prisma from "../../lib/prisma";
import { unlink } from "fs";

export default async function handler(req, res){

    if(req.body.isMany){
        try{
            const filenames = req.body.filenames;
            //delete the video paths from db
            const response = await prisma.Videos.deleteMany({
                where:{
                    Path: {
                        in: filenames
                    }
                }
            })

            //delete files from disk
            filenames.forEach(filename => {
                unlink(`./public/videos/${filename}`, (err) => {
                    if(err){
                        return res.status(500).send({response: "error", message: err});
                    }
                })
            });

            return res.send({response: "success", message: "files were deleted"});
        } catch (e){
            return res.status(500).send({response: "error", message: e.message})
        }

    } else {
        try{
            //delete the video path from db
            const response = await prisma.videos.delete({
                where: {
                    Path: req.body.filename
                }
            });
    
            //delete the file from disk
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
}