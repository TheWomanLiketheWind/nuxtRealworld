<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">

          <ListErrors :error="errors" />

          <form @submit.prevent="submitInfo">
            <fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control form-control-lg"
                       placeholder="Article Title"
                       v-model="articleInfo.title"
                       :disabled="disabled"
                       required>
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control"
                       placeholder="What's this article about?"
                       v-model="articleInfo.description"
                       :disabled="disabled"
                       required>
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control"
                          rows="8"
                          placeholder="Write your article (in markdown)"
                          v-model="articleInfo.body"
                          :disabled="disabled"
                          required></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control"
                       placeholder="Enter tags"
                       v-model="articleTag"
                       @change="addArticleTag"
                       :disabled="disabled">

                <div class="tag-list">
                  <span v-for="item in articleInfo.tagList"
                        class="tag-default tag-pill">
                    <i class="ion-close-round"></i>
                    {{item}}
                  </span>
                </div>
                <button class="btn btn-lg pull-xs-right btn-primary">
                  Publish Article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { setArticlesApi, getArticlesInfoApi, uploadArticlesApi } from '../../api'

export default {
  middleware: 'authenticated',
  data() {
    return {
      articleInfo: {},
      articleTag: '',
      disabled: false,
      errors: []
    }
  },
  async asyncData(content) {
    if (content.route.query.slug) {
      const { data } = await getArticlesInfoApi(content.route.query.slug)
      return {
        articleInfo: data.article
      }
    } else {
      return {
        articleInfo: {
          title: '',
          description: '',
          body: '',
          tagList: []
        }
      }
    }
  },
  methods: {
    // input change 事件
    addArticleTag(e) {
      this.articleInfo.tagList.push(e.target.value)
      this.articleTag = ''
    },
    // 提交信息
    async submitInfo() {
      this.disabled = true
      const slug = this.$route.query.slug
      this.articleTag && this.articleInfo.tagList.push(this.articleTag)
      const IsOwnArticle = slug ? uploadArticlesApi : setArticlesApi
      const parmas = slug ? { article: this.articleInfo, slug: slug } : { article: this.articleInfo }
      try {
        const { data } = await IsOwnArticle(parmas)
        this.$router.push(`/Article?slug=${data.article.slug}`)
      } catch (errors) {
        console.log(errors)
        // this.errors = errors
      }
    }
  }
}
</script>

<style>
</style>