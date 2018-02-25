<template lang="html">
  <section>
    <b-collapse class="card" v-for="todo in todos" :style="styleMargin">
        <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
                {{todo.task}}
            </p>
            <a class="card-header-icon">
                <b-icon
                    :icon="props.open ? 'menu-down' : 'menu-up'">
                </b-icon>
            </a>
        </div>
        <div class="card-content">
            <div class="content">
              assign to : {{todo.assign}}
              <br>
              point : {{todo.point}}
            </div>
        </div>
        <footer class="card-footer">
            <a class="card-footer-item" @click='moveToBackLog(todo)'>Back-Log</a>
            <a class="card-footer-item" @click='moveToDoing(todo)'> Doing</a>
        </footer>
    </b-collapse>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      styleMargin: {
        'margin-bottom': '20px'
      }
    }
  },
  methods: {
    moveToBackLog (task) {
      let move = {
        assign: task.assign,
        task: task.task,
        point: task.point
      }
      this.$db.ref(`backLog/${task.key}`).set(move)
      this.$db.ref(`todo/${task.key}`).remove()
    },
    moveToDoing (task) {
      let move = {
        assign: task.assign,
        task: task.task,
        point: task.point
      }
      this.$db.ref(`doing/${task.key}`).set(move)
      this.$db.ref(`todo/${task.key}`).remove()
    }
  },
  computed: {
    todos () {
      return this.$store.state.todo
    }
  }
}
</script>

<style lang="css">
</style>
