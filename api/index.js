import { request } from '../plugins/request'
import { formatGetUri } from '../utils'

// 登录
const LoginApi = (parmars) => request.post('/users/login', parmars)
// 注册
const RegisterApi = (parmars) => request.post('/users', parmars)
// 获取用户信息
const getUserInfoApi = () => request.get('/user')
// 更新用户信息
const setUserInfoApi = (parmars) => request.put('/user', parmars)
// 
const profilesInfoApi = (username) => request.get(`/profiles/${username}`)
// 点击Follow
const setProfilesFollowApi = (username) => request.post(`/profiles/${username}/follow`)
// 删除Follow
const delProfilesFollowApi = (username) => request.delete(`/profiles/${username}/follow`)
// 获取文章
const getArticlesApi = (parmars) => request.get(`/articles${formatGetUri(parmars)}`,)
// 获取公共文章
const getArticlesFeedApi = (parmars) => request.get(`/articles/feed${formatGetUri(parmars)}`)
// 文章详情
const getArticlesInfoApi = (parmars) => request.get(`/articles/${parmars}`)
// 新增文章
const setArticlesApi = (parmars) => request.post(`/articles`, parmars)
// Tag 
const getTagsApi = () => request.get(`/tags`)
// 点赞
const setFavoriteApi = (slug) => request.post(`/articles/${slug}/favorite`)
// 取消点赞
const delFavoriteApi = (slug) => request.delete(`/articles/${slug}/favorite`)
// 评论列表
const getCommentsApi = (slug) => request.get(`/articles/${slug}/comments`)
// 去评论
const setCommentsApi = (parmars) => request.post(`/articles/${parmars.slug}/comments`, parmars)
// 删除评论
const delCommentsApi = (parmars) => request.delete(`/articles/${parmars.slug}/comments/${parmars.id}`)


export {
  LoginApi,
  RegisterApi,
  getUserInfoApi,
  setUserInfoApi,
  profilesInfoApi,
  setProfilesFollowApi,
  delProfilesFollowApi,
  getArticlesApi,
  getArticlesFeedApi,
  getArticlesInfoApi,
  setArticlesApi,
  getTagsApi,
  setFavoriteApi,
  delFavoriteApi,
  getCommentsApi,
  setCommentsApi,
  delCommentsApi
}