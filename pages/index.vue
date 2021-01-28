<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Hello conduitwww 222111</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item"
                  v-if="user">
                <nuxt-link class="nav-link"
                           exact
                           :class="{active: tabs === 'your_feed'}"
                           :to="{path: '/', query: {tab: 'your_feed'}}">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           exact
                           :class="{active: tabs === 'global_feed'}"
                           :to="{path: '/', query: {tab: 'global_feed'}}">Global Feed</nuxt-link>
              </li>
              <li class="nav-item"
                  v-if="$route.query.tag">
                <nuxt-link class="nav-link"
                           exact
                           :class="{active: tabs === 'choose_feed'}"
                           :to="{path: '/', query: {tab: 'choose_feed', tag: tags}}">#{{tags}}</nuxt-link>
              </li>
            </ul>
          </div>
          <ArticleList :articlesList="articles"
                       :articlesPage="articlesPage"
                       :tabs="tabs"
                       :pages="pages" />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link :to="{path: '/', query: { tag: item, tab: 'choose_feed'}}"
                         class="tag-pill tag-default"
                         v-for="item in articlesTags"
                         :key="item">{{item}}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getArticlesApi, getTagsApi, getArticlesFeedApi, setFavoriteApi, delFavoriteApi } from '../api/index'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      articleInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData(content) {
    let limit = 10
    let pages = parseInt(content.route.query.page) || 1
    let tags = content.route.query.tag || ''
    let tabs = content.route.query.tab || 'global_feed'

    let articlesList = tabs === 'global_feed' ? getArticlesApi : getArticlesFeedApi

    const [articlesInfo, tagsInfo] = await Promise.all([articlesList({ tag: tags, limit, offset: (pages - 1) * limit }), getTagsApi()])
    const { articles, articlesCount } = articlesInfo.data
    articles.forEach(article => {
      article.favoriteDisabled = false;
      article.followDisabled = false
      return article
    })

    return {
      articles: articles,
      articlesCount: articlesCount,
      articlesPage: Math.ceil(articlesCount / limit),
      articlesTags: tagsInfo.data.tags,
      tags,
      pages,
      tabs
    }
  },
}
</script>

<style>
</style>