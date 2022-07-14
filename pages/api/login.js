import {withIronSessionApiRoute} from "iron-session/next";
import { PrismaClient } from '@prisma/client';
import { sessionOptions } from "../../lib/session";
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

export default withIronSessionApiRoute(async (req, res) => {
    const { reqUsername, reqPassword } = await req.body;
  
    try {
        const userData = await prisma.users.findUnique({
            where: {
                Username: req.body.username,
            },
        })

        const valid = await bcrypt.compare(req.body.password, userData.Password);
        if (!valid || !userData){
            res.status(403).json({ message: "Incorrect password or username" });
        }
  
        const login = userData.Username;
        const user = { isLoggedIn: true, login };
        req.session.user = user;
        await req.session.save();
        res.json(user);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }, sessionOptions);