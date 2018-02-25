<template>
    <section>
      <form action="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
            </header>
            <section class="modal-card-body">
              <b-field label="Assign to">
                  <b-input
                      type="text"
                      v-model="assign"
                      placeholder="to whom you assign this task"
                      required>
                  </b-input>
              </b-field>

              <b-field label="Task">
                  <b-input
                      type="text"
                      v-model="task"
                      placeholder="Add task here"
                      required>
                  </b-input>
              </b-field>

              <b-field label="point">
                  <b-input
                      type="number"
                      v-model="point"
                      placeholder="point of completion"
                      required>
                  </b-input>
              </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button class="button is-primary" @click="addTask">Submit</button>
            </footer>
        </div>
      </form>
    </section>
</template>

<script>
import store from '../store'

export default {
  data: function () {
    return {
      isComponentModalActive: false,
      task: null,
      assign: null,
      point: null
    }
  },
  methods: {
    addTask () {
      console.log('-----------');
      let newbacklog = {
        assign: this.assign,
        point: this.point,
        task: this.task
      }
      var newPostKey = this.$db.ref('backlog').push().key
      newbacklog.key = newPostKey
      console.log('DISNI',this.$parent);
      // console.log(this.$parent);
      // console.log(this.$parent);
      // this.$db.ref(`backlog/${newPostKey}`).set(newbacklog)


      // console.log(newPostKey);

      console.log(newbacklog);
      // console.log(newbacklog);
      // this.$store.commit('addTask', newbacklog)
      // this.$parent.close()

    }
  }
}
</script>
