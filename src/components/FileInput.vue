<template>
    <div class="FileInput">
        <input @change="checkExtentionAndParseCSV" class="FileInput__input" type="file" name="photo">
        <button @click.prevent="chouseFile" class="FileInput__button">Impor User</button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "FileInput",
        data(){
            return{
                input: '',
            }
        },
        methods:{
            ...mapActions([
                'PARSE_CSV',
                'GET_EXT'
            ]),
            chouseFile(){
                this.input.click()
            },
            checkExtentionAndParseCSV(){
                let file = this.input.files[0]
                let fileName = this.input.value
                let ext = this.GET_EXT(fileName)
                if(ext){
                    this.PARSE_CSV(file)
                }
            }
        },
        mounted(){
            let v = this
            this.$nextTick(()=>{
                v.input = document.querySelector('.FileInput__input')
            })
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/colors.scss';

.FileInput {
    display: flex;
    position: relative;

    &__input{
        display: none;
    }
    &__button{
        width: 170px;
        height: 35px;

        cursor: pointer;
        background-color: $file-input;
        border-radius: 8px;
        border: none;
        padding: 5px;

        color: white;
        font-size: 16px;

        overflow: hidden;
    }
}

</style>