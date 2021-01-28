<template>
  <div class="article-meta">
    <a href=""><img :src="articlesInfo.author.image" /></a>
    <div class="info">
      <a href=""
         class="author">{{articlesInfo.author.username}}</a>
      <span class="date">{{articlesInfo.createdAt | data('MMM DD,YYYY')}}</span>
    </div>
    <button class="btn btn-sm"
            :class="articlesInfo.author.following?'action-btn btn-secondary':'btn-outline-secondary'"
            @click="onFollow(articlesInfo.author)">
      <i class="ion-plus-round"></i>
      &nbsp;
      {{articlesInfo.author.following?'unFollow':'Follow'}} {{articlesInfo.author.username}}
    </button>

    <button class="btn btn-sm btn-outline-primary"
            @click="onFavorite(articlesInfo)">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{articlesInfo.favoritesCount}})</span>
    </button>
  </div>
</template>

<script>
import { setFavoriteApi, delFavoriteApi, setProfilesFollowApi, delProfilesFollowApi } from '../api/index'

export default {
  props: {
    articlesInfo: Object
  },
  methods: {
    onFavorite(e) {
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
        e.favorited = false
        e.favoritesCount += -1
      } catch {
        console.log('取消点赞失败, 请稍后重试')
      }
      e.favoriteDisabled = false
    },
    onFollow(e) {
      if (e.following) {
        // 取消点赞
        this.delFollow(e)
      } else {
        // 点赞
        this.setFollow(e)
      }
    },
    // 点赞
    async setFollow(e) {
      e.followDisabled = true
      try {
        const { data } = await setProfilesFollowApi(e.username)
        e.following = true
      } catch {
        console.log('Follow 失败, 请稍后重试')
      }
      e.followDisabled = false
    },
    // 取消点赞
    async delFollow(e) {
      e.followDisabled = true
      try {
        const { data } = await delProfilesFollowApi(e.username)
        e.following = false
      } catch {
        console.log('Follow 失败, 请稍后重试')
      }
      e.followDisabled = false
    }
  }
}
</script>

<style>
</style>