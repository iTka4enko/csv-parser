<template>
  <div class="container">
    <div class="parser">
        <Table class="parser__table"></Table>
        <FileInput class="parser__file"></FileInput>
        <ErrorAlert v-show="showAlert" class="parser__alert"></ErrorAlert>
    </div>
  </div>
</template>

<script>
import Table from './components/Table.vue'
import FileInput from './components/FileInput.vue'
import ErrorAlert from './components/ErrorAlert.vue'

export default {
  name: 'App',
  components: {
    Table,
    FileInput,
    ErrorAlert
  },
  data(){
    return{
      showAlert: false,
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/defolts.scss';

.parser{
  display: flex;
  flex-flow: column;
  align-items: flex-end;

  &__file{
    margin-right: 10px;
    margin-top: 20px;
  }
  &__alert{
    margin: 0 auto;
    margin-top: 60px;
  }
}
</style>
