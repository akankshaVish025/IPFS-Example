const express = require("express");
require("./config.js/database").connect();
const app = express();
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const { Land } = require("./model/user");


var ipfsAPI = require('ipfs-api');
// connect to ipfs daemon API server
// var ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});   // Also right way
// var ipfs = ipfsAPI('ipfs.io', '443', {protocol: 'https'});  
var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/storeData', upload.single('file'), async function (req, res, next) {
    try {
        let body = req.body;
        var data = await fs.readFileSync(req.file.path);
        let result = await ipfs.add(data);
        let cid = result[0].hash;

        const landAsset = await Land.findOne({ "landId": body.landId });
        if (!landAsset) { 
            let count = await Land.find({}).count();
            let id = parseInt(count) + 1;
    
            const metadata = {
                name: body.landName,
                landId: body.landId,
                description: body.description,
                attributes: [
                    { trait_type: 'Size', value: body.size }
                ],
                properties: {
                    files: [
                        {
                            uri: body.landId + ".png",
                            type: "image/png",
                        },
                    ]
                },
                image: '',
            };
            // Update the metadata with the IPFS CID
            metadata.image = `ipfs://${cid}`;
    
            // Convert the NFT metadata to a Buffer:
            const nftBuffer = Buffer.from(JSON.stringify(metadata));
            // Upload the nftBuffer data to IPFS:
            let nftmetatdata = await ipfs.add(nftBuffer);
            const ipfsUrl = `https://ipfs.io/ipfs/${nftmetatdata[0].hash}`;

            let obj = {
                id: id.toString(),
                landId: body.landId,
                landName: body.landName,
                description: body.description,
                size: body.size,
                ipfsUrl: ipfsUrl
            }
            let land = await Land.create(obj);

            // var land = await createLand(req, x, dbo);
            res.status(200).json({ status: "Ok", data: ipfsUrl, message: 'Assets created Successfully' });
        } else {
            return res.status(400).json({ status: "notOk", message: "Assets id already exists" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Ok", message: 'Internal Server Error' });
    }
});

app.get('/download/:ID', function (req, res) {
    console.log("ID", req.params.ID);
    res.send('https://ipfs.io/ipfs/' + req.params.ID);
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})