<template>
    <table class="table">
      <tr class="table__header table-row">
        <td>ID</td>
        <td>Full name</td>
        <td>Phone</td>
        <td>Email</td>
        <td>Experience</td>
        <td>Yearly income</td>
        <td>Has children</td>
        <td>License states</td>
        <td>Expiration date</td>
        <td>License number</td>
        <td>Duplicate with</td>
      </tr>
      <tr class="table__user table-row">
          <td>1</td>
          <td>Full name</td>
          <td>Phone</td>
          <td>Email</td>
          <td>Experience</td>
          <td>Yearly income</td>
          <td>Has children</td>
          <td>License states</td>
          <td>Expiration date</td>
          <td>License number</td>
          <td>Duplicate with</td>
      </tr>
    </table>
</template>

<script>
export default {
    name: 'Table'
}
</script>

<style lang="scss" scoped>
@import '../assets/colors.scss';

.table{
  &__header{
    td{
      background-color: $table-header;

      &:first-child{
          font-weight: bold;
      }
    }
  }
  &-row{

    td{
      padding: 10px;
    }
  }
  &__user{
    td{
      
    }
  }
  
}
</style>