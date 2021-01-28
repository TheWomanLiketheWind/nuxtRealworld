<template>
  <div>
    <ul class="error-messages">
      <div class="ng-scope"
           v-for="item in error">
        <li v-for="items in item"
            class="ng-binding ng-scope">
          {{error[item]}} {{items}}
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'listErrors',
  props: {
    error: Array
  },
  mounted() {
    console.log(this.error)
  }
}
</script>

<style>
</style>