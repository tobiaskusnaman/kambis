<template lang="html">
  <section>
    <b-collapse class="card" v-for="done in dones" :style="styleMargin">
        <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
                {{done.task}}
            </p>
            <a class="card-header-icon">
                <b-icon
                    :icon="props.open ? 'menu-down' : 'menu-up'">
                </b-icon>
            </a>
        </div>
        <div class="card-content">
            <div class="content">
              assign to : {{done.assign}}
              <br>
              point : {{done.point}}
            </div>
        </div>
        <footer class="card-footer">
            <a class="card-footer-item" @click='moveToDoing(done)'>Back-Log</a>
            <a class="card-footer-item" @click='taskDone(done)'> Submit</a>
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
    moveToDoing (task) {
      let move = {
        assign: task.assign,
        task: task.task,
        point: task.point
      }
      this.$db.ref(`doing/${task.key}`).set(move)
      this.$db.ref(`done/${task.key}`).remove()
    },
    taskDone (task) {
      let move = {
        assign: task.assign,
        task: task.task,
        point: task.point
      }
      this.$db.ref(`done/${task.key}`).remove()
    }
  },
  computed: {
    dones () {
      return this.$store.state.done
    }
  }
}
</script>

<style lang="css">
</style>
