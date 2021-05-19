<template>
  <section class="content">
    <div class="row center-block">
      <h2>Список всех сервисов</h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <button class="btn btn-primary" @click="create">Добавить сервис</button>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">

                </div>
              </div>

              <div class="row" v-if="!this.$store.state.callingAPI">
                <div class="col-sm-12 table-responsive">
                  <table aria-describedby="example1_info" role="grid" id="example1"
                         class="table table-bordered table-striped dataTable">
                    <thead>
                    <tr role="row">
                      <th style="width: 167px;" colspan="1" rowspan="1" class="sorting" v-for="field in fields"
                          @click="doSort(field.name)">{{ field.tname }}
                      </th>
                      <th style="width: 167px;" colspan="1" rowspan="1">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="even" role="row" v-for="service in services">
                      <td>{{ service.id }}</td>
                      <td>{{ service.name }}</td>
                      <td>{{ service.diseases_count }}</td>
                      <td>{{ service.created_at }}</td>
                      <td>{{ service.updated_at }}</td>
                      <td>
                        <router-link tag="li" class="btn btn-sm btn-flat btn-primary"
                                     :to="'/services/edit/' + service.id">
                          <i class="fa fa-pencil"></i> Редактировать
                        </router-link>
                        <button class="btn btn-sm btn-flat btn-danger"
                                @click="idToDestroyClicked(service.id)"
                                data-toggle="modal"
                                data-target="#modal-danger"><i class="fa fa-trash"> </i>Удалить</button>
                      </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                      <th colspan="1" rowspan="1" v-for="field in fields">{{ field.tname }}</th>
                      <th colspan="1" rowspan="1">Действия</th>
                    </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
    <div class="modal modal-danger fade" id="modal-danger">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Вы уверены?</h4>
          </div>
          <div class="modal-body">
            <p>Вы действительно хотите удалить?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-outline" data-dismiss="modal" @click="destroy">Удалить</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
  </section>
</template>

<script>
import api from '../../../../api'

export default {
  name: 'Services',
  mounted() {
    this.getServices()
  },
  data() {
    return {
      fields: [
        {
          name: 'id',
          tname: 'ID'
        },
        {
          name: 'name',
          tname: 'Название'
        },
        {
          name: 'diseases_count',
          tname: 'Количество услуг'
        },
        {
          name: 'created_at',
          tname: 'Создано'
        },
        {
          name: 'updated_at',
          tname: 'Изменено'
        }
      ],
      curSort: 'id',
      sortDir: 'asc',
      services: [],
      idToDestroy: null
    }
  },
  methods: {
    getServices() {
      this.$store.commit('TOGGLE_LOADING')
      this.$store.commit('TOGGLE_SEARCHING')
      api
        .request('GET', `/api/service?include=diseasesCount&sort=${(this.sortDir === 'asc' ? '' : '-') + this.curSort}`, {})
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
    create() {
      this.$router.push('/services/create')
    },
    doSort(field) {
      if (field === 'diseases_count') {
        field = 'diseasesCount'
      }
      this.curSort = field
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'
      this.getServices()
    },
    destroy() {
      api
        .request('DELETE', `/api/admin/service/${this.idToDestroy}`)
        .then(respnose => {
          this.getServices()
        })
        .catch(error => {
          console.log(error)
        })
    },
    idToDestroyClicked(id) {
      this.idToDestroy = id
    }
  }
}
</script>

<style scoped>

</style>
