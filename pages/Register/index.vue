<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="">Have an account?</a>
          </p>

          <ul class="error-messages">
            <!-- <template v-for="(item, message) in errors">
              {{message}}
              <!-- <li v-for="(itemChild, messageChild) in item">{{itemChild}}</li> -->
            <!-- </template> -->
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="text"
                     placeholder="Your Name"
                     v-model="user.username"
                     required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="email"
                     placeholder="Email"
                     v-model="user.email"
                     required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="password"
                     placeholder="Password"
                     required
                     v-model="user.password"
                     minlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign In
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { RegisterApi } from '../../api/index'

export default {
  middleware: 'notAuthenticated',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: [
        {
          'name of error': [
            { 0: '212131' }
          ]
        },
      ]
    }
  },
  methods: {
    // 登录提交
    async onSubmit() {
      try {
        const { data } = await RegisterApi({ user: this.user })
        console.log(data)
        this.$router.push('/')
      } catch ({ errors }) {
        this.errors = errors
      }
    }
  }
}
</script>

<style>
</style>

