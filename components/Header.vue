<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <router-link to="/"
                     class="navbar-brand">
          conduit
        </router-link>

        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <router-link class="nav-link"
                         to="/"
                         exact>Home</router-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <router-link class="nav-link"
                           to="/Edit">
                <i class="ion-compose"></i>&nbsp;New post
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link"
                           to="/Settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link ng-binding"
                           to="/Profile">
                <img class="user-pic"
                     :src="user.image">
                {{user.username}}
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link"
                           to="/Register">Sign up</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link"
                           to="/Login">Sign In</router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>
</style>