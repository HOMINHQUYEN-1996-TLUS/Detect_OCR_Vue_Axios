import Vue from 'vue';
import Router from 'vue-router';
import ShowImage from '../components/ShowImage.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: Image,
      component: ShowImage
    }
  ]
});