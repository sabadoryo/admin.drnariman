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
          <label for="name">Название услуги</label>
          <input type="text" class="form-control" id="name" placeholder="Введите название услуги"
                 v-model="name">
        </div>
        <div class="form-group">
          <wysiwyg v-model="description"/>
        </div>
        <div class="form-group">
          <label for="icon">Иконка на главной страницу</label>
          <input type="file" :id="icon" @change="attachIcon" accept="image/svg+xml">

          <p class="help-block">svg only</p>
        </div>
        <div class="form-group">
          <label for="icon">Картинка раздела</label>
          <input type="file" :id="icon" @change="attachMainImage" accept="image/png, image/gif, image/jpeg">

          <p class="help-block">png,jpeg,jpg</p>
        </div>
        <div class="form-group">
          <label>Сервис</label>
          <select class="form-control" v-model="service_id">
            <option v-for="service in services" :value="service.id">{{ service.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Специлаисты для услуги(выбирайте через ctrl)</label>
          <select class="form-control select2" multiple="multiple" data-placeholder="Select a State"
                  style="width: 100%;" v-model="specialistIds">
            <option v-for="specialist in specialists" :value="specialist.id">{{ specialist.full_name }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Добавить примеры работ
            <button class="btn btn-sm btn-google" @click="addPw">+</button>
          </label>
          <div v-for="(pw,key) in previous_works">
            <div class="form-group">
              <button class="btn btn-sm btn-danger" @click="removePw(key)">-</button>
              <br>
              <label :for="pw.name">Имя пациента</label>
              <input type="text" class="form-control" :id="pw.name" placeholder="Введите имя пациента"
                     v-model="pw.patient_name">
            </div>
            <div class="form-group">
              <label :for="pw.description">Отзыв пациента</label>
              <input type="text" class="form-control" :id="pw.description" placeholder="Введите отзыв пациента"
                     v-model="pw.description">
            </div>

            <div class="form-group">
              <label :for="key + 'image_before'">Картинка до оказания услуг</label>
              <input type="file" :id="key + 'image_before'" @change="attachBeforeImageToPw">

              <p class="help-block">jpg,png,jpeg</p>
            </div>

            <div class="form-group">
              <label :for="key + 'image_before'">Картинка после оказания услуг</label>
              <input type="file" :id="key + 'image_after'" @change="attachAfterImageToPw">

              <p class="help-block">jpg,png,jpeg</p>
            </div>
          </div>
        </div>

        <!--        <div class="box-body no-padding">-->
        <!--          <ul class="users-list clearfix">-->
        <!--            <li v-for="pw in previous_works">-->
        <!--              <img :src="pw.media[0].url" height="50px" width="50px" alt="User Image">-->
        <!--              <img :src="pw.media[0].url" height="50px" width="50px" alt="User Image">-->
        <!--              <a class="users-list-name" href="#">{{pw.patient_name}}</a>-->
        <!--              <span class="users-list-date">Today</span>-->
        <!--            </li>-->
        <!--          </ul>-->
        <!--          &lt;!&ndash; /.users-list &ndash;&gt;-->
        <!--        </div>-->

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
      <button class="btn btn-primary" @click="store">Создать</button>
    </div>
  </section>
</template>

<script>
import api from '../../../../api'

export default {
  name: 'DiseasesCreate',
  mounted() {
    this.getServices()
    this.getSpecialists()
  },
  data() {
    return {
      name: null,
      description: null,
      service_id: null,
      icon: null,
      main_image: null,
      specialists: [],
      previous_works: [
        {
          patient_name: '',
          description: '',
          image_before: null,
          image_after: null
        }
      ],
      services: [],
      errors: [],
      success: false,
      specialistIds: []
    }
  },
  methods: {
    handleInput(val) {
      console.log(val)
    },
    store() {
      const formData = new FormData()

      formData.append('name', this.name)
      formData.append('service_id', this.service_id)
      formData.append('description', this.description)
      formData.append('icon', this.icon)
      formData.append('main_image', this.main_image)
      for (var i = 0; i < this.specialistIds.length; i++) {
        formData.append('specialists[]', this.specialistIds[i])
      }
      for (var j = 0; j < this.previous_works.length; j++) {
        formData.append(`previous_works[${j}][patient_name]`, this.previous_works[j].patient_name)
        formData.append(`previous_works[${j}][description]`, this.previous_works[j].description)
        formData.append(`previous_works[${j}][image_after]`, this.previous_works[j].image_after)
        formData.append(`previous_works[${j}][image_before]`, this.previous_works[j].image_before)
      }
      this.$store.commit('TOGGLE_LOADING')
      api
        .request('POST', '/api/admin/disease', formData)
        .then(response => {
          this.$router.push('/diseases')
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
    getSpecialists() {
      api
        .request('GET', `/api/specialist`)
        .then(response => {
          this.specialists = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getServices() {
      this.$store.commit('TOGGLE_LOADING')
      this.$store.commit('TOGGLE_SEARCHING')
      api
        .request('GET', `/api/service`)
        .then(response => {
          this.services = response.data.data
          this.$store.commit('TOGGLE_LOADING')
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          console.log(error)

          this.response = 'Server appears to be offline'
        })
    },
    addPw() {
      this.previous_works.push({patient_name: '', description: '', image_after: null, image_before: null})
    },
    removePw(index) {
      this.previous_works.splice(index, 1)
    },
    attachAfterImageToPw(event) {
      let index = event.path[0].id[0]
      this.previous_works[index].image_after = event.target.files[0]
    },
    attachBeforeImageToPw(event) {
      let index = event.path[0].id[0]
      this.previous_works[index].image_before = event.target.files[0]
    },
    attachIcon(event) {
      this.icon = event.target.files[0]
    },
    attachMainImage(event) {
      this.main_image = event.target.files[0]
    }
  }
}
</script>

<style scoped>

</style>
