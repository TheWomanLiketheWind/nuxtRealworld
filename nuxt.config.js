export default {
  components: true,
  router: {
    linkActiveClass: 'active'
  },
  plugins: [
    '~/plugins/request',
    '~/plugins/day',
  ],
  server: {
    host: '0.0.0.0',
    port: 3000
  }
}