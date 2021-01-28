<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{articlesInfo.title}}</h1>

        <AuthorInfo :articlesInfo="articlesInfo" />
      </div>
    </div>

    <div class="container page">

      <div class="row article-content"
           v-html="articlesInfo.body"></div>

      <hr />

      <div class="article-actions">
        <AuthorInfo :articlesInfo="articlesInfo" />
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form"
                @submit.prevent="setComments(articlesInfo.slug)">
            <div class="card-block">
              <textarea class="form-control"
                        placeholder="Write a comment..."
                        rows="3"
                        v-model="textareaVal"></textarea>
            </div>
            <div class="card-footer">
              <img :src="articlesInfo.author.image"
                   class="comment-author-img" />
              <button class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <div class="card"
               v-for="item in commentsList"
               :key="item.slug">
            <div class="card-block">
              <p class="card-text">{{item.body}}</p>
            </div>
            <div class="card-footer">
              <a href=""
                 class="comment-author">
                <img :src="item.author.image"
                     class="comment-author-img" />
              </a>
              &nbsp;
              <a href=""
                 class="comment-author">{{item.author.username}}</a>
              <span class="date-posted">{{item.updatedAt | data('MMM DD, YYYY')}}</span>
              <span class="mod-options"
                    v-if="user.username === item.author.username">
                <i class="ion-trash-a"
                   @click="delComments(articlesInfo.slug, item.id)"></i>
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { getArticlesInfoApi, getCommentsApi, setCommentsApi, delCommentsApi } from '../../api'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      textareaVal: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  // 进入页面前，先进入 middleware 操作
  middleware: 'authenticated',
  async asyncData(content) {
    let slug = content.route.query.slug
    const getArticlesInfo = getArticlesInfoApi(slug)
    const getComments = getCommentsApi(slug)

    const [articlesInfos, commentsLists] = await Promise.all([getArticlesInfo, getComments])
    const { article } = articlesInfos.data
    const { comments } = commentsLists.data

    return {
      articlesInfo: article,
      commentsList: comments
    }
  },
  methods: {
    // 添加评论
    async setComments(slug) {
      try {
        const { data } = await setCommentsApi({ slug: slug, comment: { body: this.textareaVal } })
        window.location.reload()
      } catch {
        alert('评论失败，请重试')
      }
    },
    // 删除评论
    async delComments(slug, id) {
      try {
        const { data } = await delCommentsApi({ slug, id })
        const commentIndex = this.commentsList.findIndex(e => e.id === id)
        this.commentsList.splice(commentIndex, 1)
      } catch {
        alert('删除评论失败，请重试')
      }
    }
  }
}
</script>

<style>
</style>