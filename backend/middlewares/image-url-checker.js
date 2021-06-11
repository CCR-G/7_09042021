module.exports = (req, res, next) => {
    const IMAGE_TYPES = [
        'jpg',
        'jpeg',
        'png',
        'gif'
    ];

    if (req.body.image_url) {
        const image_url = req.body.image_url.toLowerCase();

        if (!image_url.startsWith('https://')) {
            return res.status(401).send({ error: `Image URL should be hosted on a HTTPS enabled website.` });
        }

        let i = 0;
        let is_image = false;

        while (!is_image && i < IMAGE_TYPES.length) {
            is_image = image_url.endsWith('.' + IMAGE_TYPES[i]);
            i++;
        }

        if (!is_image) {
            return res.status(401).send({ error: `Image should have one of the following extensions: .jpg, .png, .gif` });
        }
    }
    next();
}