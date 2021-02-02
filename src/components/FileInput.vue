<template>
    <div class="FileInput">
        <input @change="changeText" class="FileInput__input" type="file" name="photo" accept="">
        <button @click.prevent="chouseFile" class="FileInput__button">Choose a file</button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                input: '',
                button: '',
            }
        },
        methods:{
            chouseFile(){
                this.input.click()
            },
            changeText(){
                this.button.innerText = this.input.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1].split('').slice(0, 22).join('')
            },
        },
        mounted(){
            let v = this
            this.$nextTick(()=>{
                v.input = document.querySelector('.FileInput__input')
                v.button = document.querySelector('.FileInput__button')
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
        font-family: 'Andika';

        overflow: hidden;
    }
}

</style>