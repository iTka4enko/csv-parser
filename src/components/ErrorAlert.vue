<template>
    <div class="errorAlert">
        error
    </div>
</template> 

<script>
export default {
    name: 'ErrorAlert',
    props: {
        error: String
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/colors.scss';

.errorAlert{
    width: 80%;  

    padding: 30px 0;

    background-color: $error-alert-bgc;
    border: 1px solid $error-alert-border;

    text-align: center;
}
</style>