<template>
  <div class="table-wrapper">
      <div class="infoWindow infoWindow--placeholder table-placeholder" v-if="!showAlert && !showTable">
          Users will displayed here
      </div>
      <table v-if="showTable" class="table">
          <thead class="table__header table-row">
            <td v-for="header in tableHeaders" :key="header">{{header}}</td>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="table__user table-row">
                <td>{{ user[tableHeaders[0]] }}</td>
                <td :class="{'invalid': !user[tableHeaders[1]] }">{{ user[tableHeaders[1]] }}</td>
                <td :class="{'invalid': !returnPhoneNumberIfValid(user[tableHeaders[2]])}">{{ returnPhoneNumberIfValid(user[tableHeaders[2]]) ? returnPhoneNumberIfValid(user[tableHeaders[2]]) : user[tableHeaders[2]]}}</td>
                <td :class="{'invalid': !isEmailValid(user[tableHeaders[3]]) }">{{ user[tableHeaders[3]] }}</td>
                <td :class="{'invalid': !isAgeValid(user[tableHeaders[4]])}">{{ user[tableHeaders[4]] }}</td>
                <td :class="{'invalid': !isExperienceValid(user[tableHeaders[5]], user[tableHeaders[4]])}">{{ user[tableHeaders[5]] }}</td>
                <td :class="{'invalid': !ifYearlyIncomeReturnStrOrFalse(user[tableHeaders[6]])}">{{ ifYearlyIncomeReturnStrOrFalse(user[tableHeaders[6]]) ? ifYearlyIncomeReturnStrOrFalse(user[tableHeaders[6]]) : user[tableHeaders[6]]}}</td>
                <td :class="{'invalid': !isHasChildrenValid(user[tableHeaders[7]])}">{{ user[tableHeaders[7]] === '' ? 'FALSE' : user[tableHeaders[7]]}}</td>
                <td :class="{'invalid': !ifStateValidReturnState(user[tableHeaders[8]])}">{{ ifStateValidReturnState(user[tableHeaders[8]]) ? ifStateValidReturnState(user[tableHeaders[8]]) : user[tableHeaders[8]] }}</td>
                <td :class="{'invalid': !isDataValid(user[tableHeaders[9]])}">{{ user[tableHeaders[9]] }}</td>
                <td :class="{'invalid': !isLicenseNumberValid(user[tableHeaders[10]])}">{{ user[tableHeaders[10]] }}</td>
                <td>{{ user[tableHeaders[11]] }}</td>
            </tr>
          </tbody>
      </table>
      <ErrorAlert v-if="showAlert"></ErrorAlert>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import ErrorAlert from '../components/ErrorAlert.vue'
import UStates from '../assets/UStates.json'

export default {
    name: 'Table',
    components:{
      ErrorAlert
    },
    data(){
      return{
        showTable: false,
        showAlert: false,
      }
    },
    computed:{
      ...mapState([
        'users',
        'fileExt'
      ]),
      tableHeaders: function(){
        if(this.users.length){
          return Object.keys(this.users[0])
        }
        return ''
      }
    },
    watch:{
      users: function(){
        this.trimFields()
        this.checkDublicatePhoneEmail()

        if(this.checkNecessaryFields() && this.fileExt == 'csv'){
          this.showTable = true
          this.showAlert = false
        }else{
          this.showTable = false
          this.showAlert = true
        }
      }
    },
    methods:{
      checkDublicatePhoneEmail(){
        let users = this.users
        users.forEach((item, i) => {
          for(let j = 0; j < users.length; j++){
              let itemPhone = this.returnPhoneNumberIfValid(String(item['Phone']))
              let itemEmail = String(item['Email']).toLowerCase()
              let testItemPhone = this.returnPhoneNumberIfValid(String(users[j]['Phone']))
              let testItemEmail = String(users[j]['Email']).toLowerCase()

              if(!itemPhone){
                itemPhone = String(item['Phone'])
                testItemPhone = String(users[j]['Phone'])
              }

              if(i !== j && (itemPhone === testItemPhone || itemEmail === testItemEmail)){  
                item['Duplicate with'] = users[j]['ID']
                break
              } 
          }
        })
      },
      trimFields(){
        let users = this.users
        users.forEach(item => {
          for(let key in item){
            item[key] = String(item[key]).trim()
          }
        })
      },
      isAgeValid(age){
        const ageNum = Number(age)
        if(ageNum < 21 || isNaN(ageNum)){
          return false
        }else{
          return true
        }
      },
      isEmailValid(email){
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regexp.test(email)
      },
      isExperienceValid(exp, age){
        const expNum = Number(exp)
        const ageNum = Number(age)
        if(isNaN(expNum) || (expNum > (ageNum - 21)) && expNum !== 0 || expNum < 0){                                            
          return false
        }else{
          return true
        }
      },
      isHasChildrenValid(has){
        if(has === 'TRUE' || has === 'FALSE' || has === ''){
          return true
        }else{
          return false
        }
      },
      ifYearlyIncomeReturnStrOrFalse(income){
        const incomeNum = Number(income)
        const regexpDec = /^[0-9]+.[0-9]+$/
        const regexpInt = /^[0-9]+$/

        if(isNaN(incomeNum) || incomeNum > 1000000 || incomeNum < 0){
          return false
        }

        if(regexpDec.test(income)){
          return incomeNum.toFixed(2)
        }
        if(regexpInt.test(income)){
          return income+'.00'
        }

        return false
      },
      isLicenseNumberValid(licenseNum){
        if(String(licenseNum).length === 6 && !String(licenseNum).includes(' ')){                          
          return true
        }else{
          return false
        }
      },
      isDataValid(timestamp){
        const date_regex1 = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        const date_regex2 = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/;
        let dateNow = new Date()
        let expirationDate = new Date(timestamp)

        if(expirationDate < dateNow){
          return false
        }
        return (date_regex1.test(timestamp)) || (date_regex2.test(timestamp)) 
      },
      ifStateValidReturnState(state){
        let statesNames = [state]
        if(state.includes('|')){
          statesNames = state.split('|').map(item => item.trim())
        }

        let result = []
        for(let obj of UStates){
          for(let key in obj){
            for(let st of statesNames){
              if(key === st || obj[key] === st){
                result.push(obj[key])
              }
            }
          }
        }
        if(result.length === statesNames.length){
          return result.join(', ')
        }else{
          return false
        }
        
      },
      returnPhoneNumberIfValid(number){
        if(!number){
          return false
        }

        const regxp1 = /^\+1\d{10}$/
        const regxp2 = /^1\d{10}$/
        const regxp3 = /^\d{10}$/
        
        if(regxp1.test(number) || regxp2.test(number) || regxp3.test(number)){
          if(regxp1.test(number)){
            return '' + number
          }
          if(regxp2.test(number)){
            return '+' + number
          }
          if(regxp3.test(number)){
            return '+1' + number
          }
        }else{
          return false
        }
      },
      checkNecessaryFields(){
        let fullName = String(this.tableHeaders[1]).toLowerCase()
        let Phone = String(this.tableHeaders[2]).toLowerCase()
        let Email = String(this.tableHeaders[3]).toLowerCase()

        if(fullName === "full name" && Phone === "phone" && Email === "email"){
          return true
        }else{
          return false
        }
      }
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/colors.scss';
@import '../../node_modules/animate.css/animate.min.css';

.table-wrapper{
  width: 100%;
}
.table{
  width: 100%;
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

      &:last-child{
        font-weight: bold;
      }
      &.invalid{
        background-color: $error;
      }
    }
  }
}
.infoWindow{
  width: 100%;  

  padding: 30px 0;

  text-align: center;
  font-weight: normal;
  font-size: 20px;

  &--placeholder{
    color: darken($table-placeholder, 100%);
    background-color: $table-placeholder;
    border: 1px solid $table-placeholder-border;

    height: 70vh;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  &--error{
    background-color: $error;
    border: 1px solid $error-border;

    animation: zoomIn .2s;
  }
}
</style>