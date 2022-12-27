import nextConnect from 'next-connect'
import multer from 'multer';
import prisma from '../../lib/prisma';

let filePaths = [];

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/videos',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
  //for every file checks database for existing name
  //TODO notify user on name match
  fileFilter: async (req, file, cb) => {
    let foundFile = await prisma.videos.findUnique({
      where: {
        Path: file.originalname,
      }
    });
    if(file.originalname === (foundFile ? foundFile.Path : "")){
      cb(null, false);
      //filePaths.push("boo");
    } else {
      filePaths.push({Path: file.originalname});
      cb(null, true);
    }
  }
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('filesToUpload'));

apiRoute.post(async (req, res) => {
  const response = await prisma.Videos.createMany({
    data: filePaths
  })
  filePaths = [];
  res.send(response);
})

apiRoute.post((req, res) => {
  return res.status(200).json({ data: 'success', paths: [...filePaths] });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  }
};