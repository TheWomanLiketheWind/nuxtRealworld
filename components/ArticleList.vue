<template>
  <div>
    <div class="article-preview"
         v-for="item in articlesList">
      <div class="article-meta">
        <a href="profile.html"><img :src="item.author.image" /></a>
        <div class="info">
          <a href=""
             class="author">{{item.author.username}}</a>
          <span class="date">{{item.updatedAt | data('MMM DD, YYYY')}}</span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right"
                type="button"
                @click="onFavorite(item)"
                :disabled="item.favoriteDisabled">
          <i class="ion-heart"></i> {{item.favoritesCount}}
        </button>
      </div>
      <nuxt-link :to="{path: '/Article', query: { slug: item.slug }}"
                 class="preview-link">
        <h1>{{item.title}}</h1>
        <p>{{item.description}}</p>
        <span>Read more...</span>
      </nuxt-link>
    </div>

    <nav>
      <ul class="pagination">
        <template v-for="item in articlesPage">
          <li class="page-item"
              :class="pages === item?'active':''">
            <nuxt-link class="page-link"
                       :to="{path: $route.fullPath, query: {page: item, tab: tabs}}">{{item}}</nuxt-link>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
import { setFavoriteApi, delFavoriteApi } from '../api/index'

export default {
  props: {
    articlesList: Array,
    articlesPage: [Number],
    tabs: String,
    pages: Number
  },
  methods: {
    onFavorite(e) {
      console.log('eee', e)
      if (e.favorited) {
        // 取消点赞
        this.delFavorite(e)
      } else {
        // 点赞
        this.setFavorite(e)
      }

    },
    // 点赞
    async setFavorite(e) {
      e.favoriteDisabled = true
      try {
        const { data } = await setFavoriteApi(e.slug)
        const articlesIndex = this.articlesList.findIndex(item => item.slug === e.slug)
        e.favorited = true
        e.favoritesCount += 1
      } catch {
        console.log('点赞失败, 请稍后重试')
      }
      e.favoriteDisabled = false
    },
    // 取消点赞
    async delFavorite(e) {
      e.favoriteDisabled = true
      try {
        const { data } = await delFavoriteApi(e.slug)
        const articlesIndex = this.articlesList.findIndex(item => item.slug === e.slug)
        e.favorited = false
        e.favoritesCount += -1
      } catch {
        console.log('取消点赞失败, 请稍后重试')
      }
      e.favoriteDisabled = false
    }
  }
}
</script>

<style>
</style>