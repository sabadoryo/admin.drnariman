<template>
  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">Заполните форму</h3>
      </div>
      <!-- /.box-header -->
      <!-- form start -->
      <div class="box-body">
        <div class="form-group">
          <label for="serviceName">Название сервиса</label>
          <input type="text" class="form-control" id="serviceName" placeholder="Введите название сервиса"
                 v-model="name">
        </div>
        <div v-if="success" class="success text-success">
          Сервис создан!
        </div>
        <div class="error-content text-red" v-for="error in errors">
          {{ error }}
        </div>
      </div>
      <!-- /.box-body -->
      <div class="box-footer">
        <button class="btn btn-primary" @click="update">Изменить</button>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../../../../api'

export default {
  name: 'ServicesEdit',
  mounted() {
    this.getService()
  },
  data() {
    return {
      name: null,
      errors: [],
      success: false
    }
  },
  methods: {
    update() {
      const {name} = this

      this.errors = []

      this.$store.commit('TOGGLE_LOADING')

      api
        .request('PUT', `/api/admin/service/${this.$route.params.id}`, {name})
        .then(response => {
          this.success = true
          this.$store.commit('TOGGLE_LOADING')
          this.$router.push('/services')
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          Object.values(error.response.data.errors).forEach(val => {
            val.forEach(v => {
              this.errors.push(v)
            })
          })
        })
    },
    getService() {
      this.$store.commit('TOGGLE_LOADING')
      api
        .request('get', `/api/service?filter[id]=${this.$route.params.id}`)
        .then(response => {
          this.name = response.data.data[0].name
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          Object.values(error.response.data.errors).forEach(val => {
            val.forEach(v => {
              this.errors.push(v)
            })
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
