const Comment = require("../models/comment.model");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({ message: "Le contenu de la requête est vide !" });
    }

    const content = req.body.content;
    if (!content || content.length > 255 || content.length < 1) {
        return res.status(400).send({ error: `Le commentaire doit comprendre entre 1 et 255 caractères.` });
    }

    const user_id = req.body.user_id;
    if (!user_id) {
        return res.status(400).send({ error: "L'utilisateur n'est pas valide" });
    }

    const post_id = req.params.postId;
    if (!post_id) {
        return res.status(400).send({ error: "Identifiant de l'article invalide" });
    }

    else {
        // Create a Comment
        const comment = new Comment({
            content: content,
            user: user_id,
            post: post_id
        });

        // Save Comment in the database
        Comment.create(comment, (err, created_comment) => {
            if (err) {
                res.status(500).send({ message: err.message || "Une erreur est survenue lors de la création du commentaire" });
            }
            else return res.status(200).json(created_comment);
        });
    }
};

exports.findAll = (req, res) => {
    const post_id = req.params.postId;
    if (!post_id) {
        return res.status(400).send({ error: "Identifiant de l'article invalide" });
    }

    Comment.getAllById(post_id, (err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message || "Une erreur est survenue à la récupération des commentaires" });
        }
        else return res.send(data);
    });
}

exports.delete = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: "Le contenu de la requête est vide !" });
    }

    else {
        const comment_id = req.params.commentId;
        if (!comment_id) {
            return res.status(400).send({ error: 'Identifiant invalide' });
        }

        else {
            Comment.delete(comment_id, (err) => {
                if (err) {
                    return res.status(500).send({ message: err.message || "Une erreur est survenue lors de la suppression du comment." })
                }
                else return res.status(200).send({ message: `Le commaintaire a été supprimé.` });
            });
        }
    }
}
