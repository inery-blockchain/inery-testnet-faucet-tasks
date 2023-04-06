const express = require('express');
const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

dotenv.config();

const app = express();
const env = process.env;
const rpc = new JsonRpc(env.Node_vps);
const signatureProvider = new JsSignatureProvider([env.Private_key]);
const api = new Api({ rpc, signatureProvider });
const account = env.Account_Inery;
const authorization = [{ actor: account, permission: 'active' }];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname).toLowerCase() !== '.png') {
      return cb(new Error('Only PNG files are allowed'))
    }
    cb(null, true)
  }
});

app.post('/upload', upload.single('file'), function (req, res, next) {
  const name = req.body.name ? req.body.name : "";
  const fileName = req.file.filename;

  sharp(`uploads/${fileName}`)
    .resize(300, 300)
    .toFormat('png')
    .toFile(`uploads/resized_${fileName}`)
    .then(() => {
      res.send(`
        <html>
          <head>
            <meta charset="utf-8">
			   <div style="border: 1px solid black; padding: 10px;">
				<center>
            <title><center>NFT Upload Inery</center></title>
          </head>
          <body>
            <form action="/upload" method="POST" enctype="multipart/form-data">
              <input type="text" name="name" placeholder="Enter NFT name">
              <input type="file" name="file">
              <button type="submit">Upload NFT</button>
            </form>
			</center>
			</div>
            <div style="text-align: center;">
              <h1>MY NFT</h1>
              <img src="/uploads/resized_${fileName}" alt="${name}" />
              <h1>${name}</h1>
            </div>
          </body>
        </html>
      `);
    })
    .catch((err) => {
      next(err);
    });
});

app.use('/uploads', express.static('uploads'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(env.PORT, () => console.log(`App listening at http://localhost:${env.PORT}`));
