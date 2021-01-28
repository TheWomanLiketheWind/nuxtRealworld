<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image"
                 class="user-img" />
            <h4>{{user.username}}</h4>
            <p>{{user.bio}}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn"
                    @click="$router.push('/Settings')">
              <i class="ion-gear-a"></i>
              &nbsp;
              Edit Profile Settings
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           exact
                           :class="{active: tabs === 'my'}"
                           :to="{path: '/Profile', query: {type: 'my', page: 1}}">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           exact
                           :class="{active: tabs === 'Favorited'}"
                           :to="{path: '/Profile', query: {type: 'Favorited', page: 1}}">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <ArticleList :articlesList="articlesList"
                       :articlesPage="articlesPage"
                       :tabs="tabs"
                       :pages="pages" />
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getArticlesApi } from '../../api'
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  watchQuery: ['page', 'tab'],
  computed: {
    ...mapState(['user'])
  },
  async asyncData(content) {
    let limit = 5
    const user = content.store.state.user
    const tabs = content.route.query.tab || 'my'
    const pages = parseInt(content.route.query.page) || 1

    const parmars = tabs === 'my' ? { author: user.username } : { favorited: user.username }
    const own_articles = await getArticlesApi(parmars)
    own_articles.data.articles.forEach(article => {
      article.favoriteDisabled = false;
      return article
    })

    return {
      articlesList: own_articles.data.articles,
      articlesCount: own_articles.data.articlesCount,
      articlesPage: Math.ceil(own_articles.data.articlesCount / limit),
      tabs,
      pages
    }
  },
}
</script>

<style>
</style>