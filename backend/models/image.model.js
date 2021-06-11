const sql = require("../helpers/connection");

class Image {
    constructor(image) {
        this.url = image.image_url;
        this.post = image.post_id;
    }
};

Image.create = (post_id, newImage, result) => {
    const query = 'INSERT INTO Images (url, post) VALUES (?, ?)';
    const inserts = [newImage.url, post_id];

    sql.query(query, inserts, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        }
        else {
            console.log("created image: ", { id: res.insertId, ...newImage });
            return result(null, { id: res.insertId, ...newImage });
        }
    });
};

module.exports = Image;
