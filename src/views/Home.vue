<template>
  <div class="home">
    <div class="content">
      <div class="container">
        <h1>INI KANBAN</h1>
        <button class="button" name="button" @click="addTask">Add</button>
        <div class="columns">
          <div class="column">
            <section>
              <b-collapse class="card">
                  <div slot="trigger" slot-scope="props" class="card-header">
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
            <ToDo/>
          </div>
          <div class="column">
            <Doing/>
          </div>
          <div class="column">
            <Done/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BackLog from '@/components/BackLog.vue'
import ToDo from '@/components/ToDo.vue'
import Doing from '@/components/Doing.vue'
import Done from '@/components/Done.vue'
import AddTask from '@/components/AddTask.vue'

export default {
  name: 'home',
  components: {
    BackLog,
    ToDo,
    Doing,
    Done,
    AddTask
  },
  methods: {
    addTask () {
      this.$modal.open({
        component: AddTask
      })
    },
    convertData (dataFireBase) {
      let arr = Object.entries(dataFireBase).map(e => Object.assign({ key: e[0] }, e[1]))
      return arr
    },
    getBackLog () {
      let self = this
      this.$db.ref('backlog').once('value')
        .then(function (snapshot) {
          let promise1 = new Promise(function (resolve, reject) {
            var data = snapshot.val()
            data = self.convertData(data)
            resolve(self.convertData(data))
          })
            .then(data => {
              self.$store.commit('setBackLog', data)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getToDo () {
      let self = this
      this.$db.ref('todo').once('value')
        .then(function (snapshot) {
          let data = snapshot.val()
          data = self.convertData(data)
          self.$store.commit('setToDo', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDoing () {
      let self = this
      this.$db.ref('doing').once('value')
        .then(function (snapshot) {
          let data = snapshot.val()
          data = self.convertData(data)
          self.$store.commit('setDoing', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    setDone () {
      let self = this
      this.$db.ref('done').once('value')
        .then(function (snapshot) {
          let data = snapshot.val()
          data = self.convertData(data)
          self.$store.commit('setDone', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    // createBackLog () {
    //   let newbacklog = {
    //     assign: 'TOBI',
    //     point: 1000,
    //     task: 'belajar'
    //   }
    //   var newPostKey = this.$db.ref('backlog').push().key;
    //   this.$db.ref(`backlog/${newPostKey}`).set(newbacklog)
    // }
  },
  created: function () {
    console.log(this);
    this.getBackLog()
    this.getToDo()
    this.getDoing()
    this.setDone()
  }
}
</script>
