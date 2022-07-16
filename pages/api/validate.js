const bcrypt = require('bcrypt');
const {promises: fsPromises} = require('fs');


export default async function handler(req, res){
    const { password } = await req.body;
    const check = await fsPromises.readFile("./public/importantPassword.txt", 'utf-8');

    const valid = await bcrypt.compare(password, check);

    res.json(valid);
    return;


}