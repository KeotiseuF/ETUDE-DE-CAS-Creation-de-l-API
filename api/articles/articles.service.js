const Article = require("./articles.schema");

class ArticlesService {
  create(data) {
    const article = new Article(data);
    return article.save();
  }
  update(id, data) {
    return Article.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) {
    return Article.deleteOne({ _id: id });
  }
  articlesUser(id) {
    return Article.find().populate({
        path: 'user',
        match: { _id: id},
        select: '-password'
    }).exec();
  }
}

module.exports = new ArticlesService();