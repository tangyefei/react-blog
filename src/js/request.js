


import service from './axios-service.js';
import Utils from './utils.js';

export default {
  Auth: {
    login(data){
      return service.post('/login', data);
    },
  },
  Admin: {
    delArticle(id) {
      return service.delete(`/collections/articles/${id}`);
    },
  },
  saveArticle(data) {
    return service.post('/collections/articles', data);
  },
  getArticle(id) {
    return service.get(`/collections/articles/${id}`);
  },
  getArticles(param){
    return service.get(`/collections/articles`);
  }
}

