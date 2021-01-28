<template>
  <div class="article-meta">
    <a href=""><img :src="articlesInfo.author.image" /></a>
    <div class="info">
      <a href=""
         class="author">{{articlesInfo.author.username}}</a>
      <span class="date">{{articlesInfo.createdAt | data('MMM DD,YYYY')}}</span>
    </div>

    <div v-if="user">
      <nuxt-link class="btn btn-outline-secondary btn-sm"
                 :to="{path: '/Edit', query: {slug: articlesInfo.slug}}">
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>

      <button class="btn btn-outline-danger btn-sm"
              @click="delArticle(articlesInfo.slug)">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </div>
    <div v-else>
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
  </div>
</template>

<script>
import { setFavoriteApi, delFavoriteApi, setProfilesFollowApi, delProfilesFollowApi, delArticlesApi } from '../api/index'
import { mapState } from 'vuex'

export default {
  props: {
    articlesInfo: Object
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async delArticle(e) {
      console.log('21212', e)

      try {
        const { data } = await delArticlesApi(e)
        this.$router.push('/Profile')
      } catch {
        alert('删除失败')
      }
    },
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
    // 收藏
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
    // 取消收藏
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

<style scoped>
.article-meta {
  display: flex;
}
</style>