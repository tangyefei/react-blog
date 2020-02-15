


import service from './axios-service.js';
import Utils from './utils.js';

export default {
  Auth: {
    login(data){
      return ajax.postJson('/api/login', data, callback);
    }
  },
  Admin: {
    delArticle(id) {
      return service.post('/api/manage/article/del', {id});
    },
  },
  saveArticle(data) {
    return service.post('/api/article', data);
  },
  getArticle(id) {
    return service.get(`/api/article/${id}`);
  },
  getArticles(param){
    return service.get(`/api/articles`);
  }
}

