<template>
  <div id="notFound">
    <img src="/static/img/Group%2079.svg" class="center-block logo">

    <div class="text-center col-sm-12">
      <h1>Если вы потерялись</h1>
      <h4>И эта страница появляется постоянно</h4>
      <router-link to="/" class="vertical-5p lead">Звоните: +77479819279</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NotFound'
}
</script>

<style>
#notFound {
  padding: 10em;
  color: white;
}
</style>
