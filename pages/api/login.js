import {withIronSessionApiRoute} from "iron-session/next";
import { sessionOptions } from "../../lib/session";
const bcrypt = require('bcrypt');
import prisma from "../../lib/prisma";

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
        const userId = userData.Id;
        const user = { isLoggedIn: true, login, userId };
        req.session.user = user;
        await req.session.save();
        res.json(user);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }, sessionOptions);