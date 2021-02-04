<template>
    <div class="infoWindow infoWindow--error">
        <template v-if="fileExt === 'csv'">
            File format is not correct
        </template>
        <template v-else>
            File is not CSV
        </template>
    </div>
</template> 

<script>
import {mapState} from 'vuex'

export default {
    name: 'ErrorAlert',
    props: {
        error: String
    },
    computed:{
        ...mapState([
            'fileExt'
        ])
    }
}
</script>

