const UnauthorizedError = require("../../errors/unauthorized");
const articlesService = require("./articles.service");

class ArticlesController {

  async create(req, res, next) {
    try {
        const userId = await req.user;
        req.body.user = userId.info["_id"];
        const article = await articlesService.create(req.body);
        req.io.emit("article:create", article);
        res.status(201).json(article);
    } catch (err) {
        next(err);
    }
  }
  async update(req, res, next) {
    try {
        const id = req.params.id;
        const user = await req.user;

        if(user.info.role === "admin") {
            const data = req.body;
            const articleModified = await articlesService.update(id, data);
            res.status(200).json(articleModified);
        } else {
            throw new UnauthorizedError();
        }      
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
        const id = req.params.id;
        const user = await req.user;
        
        if(user.info.role === "admin") {
            await articlesService.delete(id);
            req.io.emit("article:delete", { id });
            res.status(204).send();
        } else {
            throw new UnauthorizedError();
        }
    } catch (err) {
        next(err);
    }
  }
}

module.exports = new ArticlesController();
