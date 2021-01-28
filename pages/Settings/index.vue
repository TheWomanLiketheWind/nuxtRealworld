<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="updateUserInfo">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control"
                       type="text"
                       placeholder="URL of profile picture"
                       v-model="userInfo.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="text"
                       placeholder="Your Name"
                       v-model="userInfo.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg"
                          rows="8"
                          placeholder="Short bio about you"
                          v-model="userInfo.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="text"
                       placeholder="Email"
                       v-model="userInfo.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="password"
                       placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>

          <hr>

          <button class="btn btn-outline-danger"
                  type="button"
                  @click="logout">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfoApi, setUserInfoApi } from '../../api'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated',
  async asyncData() {
    const { data } = await getUserInfoApi()
    return {
      userInfo: data.user
    }
  },
  methods: {
    async updateUserInfo() {
      const { data } = await setUserInfoApi({ user: this.userInfo })
      this.$store.commit('setUser', data.user)
      this.$router.push('/Profile')
    },
    logout() {
      Cookie.remove('user')
      this.$store.commit('setUser', null)
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>