<template>
  <section class="content">
    <div class="row center-block">
      <h2>Список всех услуг</h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <button class="btn btn-primary" @click="create">Добавить услугу</button>
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
                    <tr class="even" role="row" v-for="item in items">
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.description }}</td>
                      <td>{{ item.service.name }}</td>
                      <td>{{ item.created_at }}</td>
                      <td>{{ item.updated_at }}</td>
                      <td>
                        <router-link tag="li" class="btn btn-sm btn-flat btn-primary"
                                     :to="'/diseases/edit/' + item.id">
                          <i class="fa fa-pencil"></i> Редактировать
                        </router-link>
                        <button class="btn btn-sm btn-flat btn-danger"
                                @click="idToDestroyClicked(item.id)"
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
  name: 'Diseases',
  mounted() {
    this.getDiseases()
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
          name: 'description',
          tname: 'Процесс лечения'
        },
        {
          name: 'service.name',
          tname: 'Принадлежит к сервису'
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
      items: [],
      idToDestroy: null
    }
  },
  methods: {
    getDiseases() {
      this.$store.commit('TOGGLE_LOADING')
      api
        .request('GET', `/api/disease?include=service&sort=${(this.sortDir === 'asc' ? '' : '-') + this.curSort}`, {})
        .then(response => {
          this.items = response.data.data
          this.$store.commit('TOGGLE_LOADING')
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          console.log(error)
        })
    },
    create() {
      this.$router.push('/diseases/create')
    },
    doSort(field) {
      this.curSort = field
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'
      this.getDiseases()
    },
    destroy() {
      api
        .request('DELETE', `/api/admin/disease/${this.idToDestroy}`)
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
