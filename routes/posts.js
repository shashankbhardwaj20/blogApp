const express = require("express");
const {composePost,handelCreatePostRequest,handelEditPostRequest,handelDeletePostRequest,handelSeeFullPostRequest,handelUserAIGetRequest,handelUserAIPostRequest} = require("../controllers/postController");
const Router = express();


Router.get("/compose",composePost);
Router.post("/compose",handelCreatePostRequest);
Router.post('/edit',handelEditPostRequest);
Router.post('/delete',handelDeletePostRequest);
Router.get('/composeP',handelUserAIGetRequest);
Router.post('/composeP',handelUserAIPostRequest);
Router.get('/:id',handelSeeFullPostRequest);

module.exports = Router;