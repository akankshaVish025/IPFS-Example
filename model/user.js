const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
    id: { type: String, default: null },
    landId: { type: String, default: null },
    landName: { type: String, default: null },
    size: { type: String, default: null },
    description: { type: String, default: null },
    ipfsUrl: { type: String, default: null },
});

// landSchema.index( { "landId": 1 }, { unique: true } );
const Land = mongoose.model("landasset", landSchema);

module.exports = {
    Land
};