import dayjs from 'dayjs'
import Vue from 'vue'

Vue.filter('data', (value, formats = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(formats)
})