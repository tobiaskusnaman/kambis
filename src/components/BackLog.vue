<template lang="html">
  <section>
    <b-collapse class="card" v-for="log in backlog" style="margin-bottom:20px;">
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
            <a class="card-footer-item">Delete</a>
            <a class="card-footer-item" @click="submitBackLog(log.key)">To-Do</a>
        </footer>
    </b-collapse>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      marginCard: '20px'
    }
  },
  computed: {
    ...mapGetters({
      backlog: 'getBackLog'
    })
  }
}
</script>

<style lang="css">
</style>
