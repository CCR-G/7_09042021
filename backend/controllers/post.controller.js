const Post = require("../models/post.model.js");
const Image = require("../models/image.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({ message: "Le contenu de la requête est vide !" });
    }

    else {
        // Create a Post
        const post = new Post({
            content: req.body.content,
            user: req.body.user,
        });

        // Save Post in the database
        Post.create(post, (err, created_post) => {
            if (err) {
                return res.status(500).send({ message: err.message || "Une erreur est survenue lors de la création de l'article." });
            }

            else {
                if (req.body.image_url) {
                    const image = new Image({
                        image_url: req.body.image_url
                    });

                    Image.create(created_post.id, image, (err, created_image) => {
                        if (err) {
                            return res.status(500).send({ message: err.message || "Une erreur est survenue lors de la création de l'image." });
                        }
                        else return res.status(200).json({ created_post, created_image });
                    });
                }

                else return res.status(200).json({ created_post });
            }
        });
    }
};

exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message || "Une erreur est survenue lors de la récupération des articles." });
        }

        else {
            data.forEach((post) => {
                if (post.last_comment_content) {
                    post.last_comment = {
                        id: post.last_comment_id,
                        content: post.last_comment_content,
                        author: post.last_comment_author
                    };
                }
                else post.last_comment = null;

                delete post.last_comment_id;
                delete post.last_comment_content;
                delete post.last_comment_author;
            });

            return res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: "Le contenu de la requête est vide !" });
    }

    else {
        const post_id = req.params.postId;
        if (!post_id) {
            return res.status(400).send({ error: "La requête ne contient pas d'id d'article." });
        }

        else {
            Post.delete(post_id, (err, data) => {
                if (err) {
                    return res.status(500).send({ message: err.message || "Une erreur est survenue lors de la suppression de l'article." });
                }
                else return res.status(200).send({ message: `L'article ${post_id} a été supprimé.` });
            });
        }
    }
};
