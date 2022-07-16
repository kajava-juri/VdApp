import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

export default async function handler(req, res) {

    try
    {
        const user = await prisma.users.findUnique({
            where: {
                Username: req.body.username,
            },
        })

        if(user)
        {
            res.status(302).json({ message: "User is found with that username" });
            return;
        }

        req.body.password = await bcrypt.hash(req.body.password, 12);

        try
        {

            const user = await prisma.users.create({
                data:{
                    Username: req.body.username,
                    Password: req.body.password,
                }
            })
            res.send(JSON.stringify({"status": 200, "error": null, "response": user.id}));
        }
        catch(e)
        {
            res.send(JSON.stringify({"status": 500, "error": 'In create user '+e, "response": null}));
        }
    }

    catch(e)
    {
    res.send(JSON.stringify({"status": 500, "error": 'In user '+e, "response": null}));
    }
}