<template>
  <div class="container">
    <div class="parser">
        <Table class="parser__table"></Table>
        <FileInput class="parser__file"></FileInput>
    </div>
  </div>
</template>

<script>
import Table from './components/Table.vue'
import FileInput from './components/FileInput.vue'

export default {
  name: 'App',
  components: {
    Table,
    FileInput,
  },
  data(){
    return{
      showAlert: false,
    }
  },
}
</script>

<style lang="scss">
@import './assets/fonts/Roboto/stylesheet.css';
@import './assets/css/defolts.scss';

.parser{
  display: flex;
  flex-flow: column;
  align-items: flex-end;

  &__table{
    margin: 0 auto;
  }
  &__file{
    margin-right: 20px;
    margin-top: 20px;
  }
  &__alert{
    margin: 0 auto;
    margin-top: 60px;
  }
}
</style>
