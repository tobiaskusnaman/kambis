<template lang="html">
  <section>
    <b-collapse class="card" v-for="doing in doings" :style="styleMargin">
        <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
                {{doing.task}}
            </p>
            <a class="card-header-icon">
                <b-icon
                    :icon="props.open ? 'menu-down' : 'menu-up'">
                </b-icon>
            </a>
        </div>
        <div class="card-content">
            <div class="content">
              assign to : {{doing.assign}}
              <br>
              point : {{doing.point}}
            </div>
        </div>
        <footer class="card-footer">
            <a class="card-footer-item" @click='moveToTodo(doing)'>To-Do</a>
            <a class="card-footer-item" @click='moveToDone(doing)'>Done</a>
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
    moveToTodo (task) {
      let move = {
        assign: task.assign,
        task: task.task,
        point: task.point
      }
      this.$db.ref(`todo/${task.key}`).set(move)
      this.$db.ref(`doing/${task.key}`).remove()
    },
    moveToDone (task) {
      let move = {
        assign: task.assign,
        task: task.task,
        point: task.point
      }
      this.$db.ref(`done/${task.key}`).set(move)
      this.$db.ref(`doing/${task.key}`).remove()
    }
  },
  computed: {
    doings () {
      return this.$store.state.doing
    }
  }
}
</script>

<style lang="css">
</style>
