<template lang="html">
  <section>
    <b-collapse class="card" v-for="log in backLog" :style="styleMargin">
        <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
                {{log.task}}
            </p>
            <a class="card-header-icon">
                <b-icon
                    :icon="props.open ? 'menu-down' : 'menu-up'">
                </b-icon>
            </a>
        </div>
        <div class="card-content">
            <div class="content">
              assign to : {{log.assign}}
              <br>
              point : {{log.point}}
            </div>
        </div>
        <footer class="card-footer">
            <a class="card-footer-item" @click="deleteBackLog(log)">Delete</a>
            <a class="card-footer-item" @click="submitBackLog(log)">To-Do</a>
        </footer>
    </b-collapse>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      styleMargin: {
        'margin-bottom': '20px'
      }
    }
  },
  methods: {
    submitBackLog (task) {
      let moveTodo = {
        assign: task.assign,
        task: task.task,
        point: task.point
      }
      this.$db.ref(`todo/${task.key}`).set(moveTodo)
      this.$db.ref(`backLog/${task.key}`).remove()
    },
    deleteBackLog (task) {
      this.$db.ref(`backLog/${task.key}`).remove()
    }
  },
  computed: {
    backLog () {
      return this.$store.state.backLog
    }
  }
}
</script>

<style lang="css">
</style>
