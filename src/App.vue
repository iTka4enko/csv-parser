<template>
  <div class="container">
    <div class="parser">
        <FileInput class="parser__file"></FileInput>
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
  justify-content: center;
  align-items: flex-end;

  padding-bottom: 20px;

  width: 100%;

  &__table{
    margin: 0 auto;

    table{
      margin: 0 auto;
    }
  }
  &__file{
    margin: 20px 30px 20px 0;
  }
  &__alert{
    margin: 0 auto;
    margin-top: 60px;
  }
}

</style>
