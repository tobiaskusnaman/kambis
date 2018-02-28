<template>
  <div class="home">
    <div class="content">
      <div class="container">
        <h1>INI KANBAN</h1>
        <button class="button" name="button" @click="getModal" style='margin:10px'>Add Task</button>
        <div class="columns">
          <div class="column">
            <section>
              <b-collapse class="card">
                  <div slot="trigger" slot-scope="props" class="card-header" style="background-color:#7F8D25">
                      <p class="card-header-title">
                          Back-Log
                      </p>
                      <a class="card-header-icon">
                          <b-icon
                              :icon="props.open ? 'menu-down' : 'menu-up'">
                          </b-icon>
                      </a>
                  </div>
                  <div class="card-content">
                      <div class="content">
                        <BackLog/>
                      </div>
                  </div>
              </b-collapse>
            </section>
          </div>

          <div class="column">
            <section>
              <b-collapse class="card">
                  <div slot="trigger" slot-scope="props" class="card-header" style="background-color:#B8C264">
                      <p class="card-header-title">
                          To-Do
                      </p>
                      <a class="card-header-icon">
                          <b-icon
                              :icon="props.open ? 'menu-down' : 'menu-up'">
                          </b-icon>
                      </a>
                  </div>
                  <div class="card-content">
                      <div class="content">
                        <ToDo/>
                      </div>
                  </div>
              </b-collapse>
            </section>
          </div>

          <div class="column">
            <section>
              <b-collapse class="card">
                  <div slot="trigger" slot-scope="props" class="card-header" style="background-color:#F1E49B">
                      <p class="card-header-title">
                          Doing
                      </p>
                      <a class="card-header-icon">
                          <b-icon
                              :icon="props.open ? 'menu-down' : 'menu-up'">
                          </b-icon>
                      </a>
                  </div>
                  <div class="card-content">
                      <div class="content">
                        <Doing/>
                      </div>
                  </div>
              </b-collapse>
            </section>
          </div>

          <div class="column">
            <section>
              <b-collapse class="card">
                  <div slot="trigger" slot-scope="props" class="card-header" style="background-color:#DE5D3C">
                      <p class="card-header-title">
                          Done
                      </p>
                      <a class="card-header-icon">
                          <b-icon
                              :icon="props.open ? 'menu-down' : 'menu-up'">
                          </b-icon>
                      </a>
                  </div>
                  <div class="card-content">
                      <div class="content">
                        <Done/>
                      </div>
                  </div>
              </b-collapse>
            </section>
          </div>
        </div>
      </div>

      <div class="modal" v-bind:class="{ 'is-active': openModalAddTask }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Add Task</p>
            <button class="delete" aria-label="close" @click='closeModalAddTask'></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label class="label">Assign to</label>
              <div class="control">
                <input class="input" type="text" v-model="assign" placeholder="e.g Tobi">
              </div>
            </div>

            <div class="field">
              <label class="label">Task</label>
              <div class="control">
                <input class="input" type="text" v-model="task" placeholder="e.g. graduate from Hacktiv8">
              </div>
            </div>

            <div class="field">
              <label class="label">Point</label>
              <div class="control">
                <input class="input" type="number" v-model="point" placeholder="e.g. 100">
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="addTask">Add Task</button>
            <button class="button" @click='closeModalAddTask'>Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>

<script>
// @ is an alias to /src
import BackLog from '@/components/BackLog.vue'
import ToDo from '@/components/ToDo.vue'
import Doing from '@/components/Doing.vue'
import Done from '@/components/Done.vue'
// import AddTask from '@/components/AddTask.vue'

export default {
  name: 'home',
  components: {
    BackLog,
    ToDo,
    Doing,
    Done
    // AddTask
  },
  data: function () {
    return {
      assign: null,
      task: null,
      point: null,
      openModalAddTask: false
    }
  },
  methods: {
    getModal () {
      this.openModalAddTask = true
    },
    addTask () {
      let newbacklog = {
        assign: this.assign,
        point: this.point,
        task: this.task
      }
      var newPostKey = this.$db.ref('backLog').push().key
      newbacklog.key = newPostKey
      this.$db.ref(`backLog/${newPostKey}`).set(newbacklog)
      this.openModalAddTask = false
    },
    closeModalAddTask () {
      this.openModalAddTask = false
    },
    convertData (dataFireBase) {
      if (dataFireBase) {
        let arr = Object.entries(dataFireBase).map(e => Object.assign({ key: e[0] }, e[1]))
        return arr
      }
    },
    getBackLog () {
      let self = this
      this.$db.ref('backLog').on('value', function (snapshot) {
        let data = snapshot.val()
        data = self.convertData(data)
        self.$store.commit('setBackLog', data)
      })
    },
    gettodo () {
      let self = this
      this.$db.ref('todo').on('value', function (snapshot) {
        let data = snapshot.val()
        data = self.convertData(data)
        self.$store.commit('setTodo', data)
      })
    },
    getDoing () {
      let self = this
      this.$db.ref('doing').on('value', function (snapshot) {
        let data = snapshot.val()
        data = self.convertData(data)
        self.$store.commit('setDoing', data)
      })
    },
    setDone () {
      let self = this
      this.$db.ref('done').on('value', function (snapshot) {
        let data = snapshot.val()
        data = self.convertData(data)
        self.$store.commit('setDone', data)
      })
    }
  },
  created: function () {
    this.getBackLog()
    this.gettodo()
    this.getDoing()
    this.setDone()
  }
}
</script>
