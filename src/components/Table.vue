<template>
    <table class="table">
      <template v-if="showTable">
        <thead class="table__header table-row">
          <td v-for="header in tableHeaders" :key="header">{{header}}</td>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="table__user table-row">
              <td>{{ user['ID'] }}</td>
              <td :class="{'invalid': !user['Full Name'] }">{{ user['Full Name'] }}</td>
              <td :class="{'invalid': !returnNumberIfValid(user['Phone'])}">{{ returnNumberIfValid(user['Phone']) ? returnNumberIfValid(user['Phone']) : user['Phone']}}</td>
              <td :class="{'invalid': !user['Email'] }">{{ user['Email'] }}</td>
              <td :class="{'invalid': !isAgeValid(user['Age'])}">{{ user["Age"] }}</td>
              <td :class="{'invalid': !isExperienceValid(user['Experience'], user['Age'])}">{{ user['Experience'] }}</td>
              <td :class="{'invalid': !isYearlyIncomeValid(user['Yearly Income'])}">{{ user['Yearly Income'] }}</td>
              <td :class="{'invalid': !isHasChildrenValid(user['Has children'])}">{{ user['Has children'] === '' ? 'FALSE' : user['Has children'] }}</td>
              <td :class="{'invalid': !ifStateValidReturnState(user['License states'])}">{{ ifStateValidReturnState(user['License states']) ? ifStateValidReturnState(user['License states']) : user['License states'] }}</td>
              <td :class="{'invalid': !isDataValid(user['Expiration date'])}">{{ user['Expiration date'] }}</td>
              <td :class="{'invalid': !isLicenseNumberValid(user['License number'])}">{{ user['License number'] }}</td>
              <td>{{ user['Duplicate with'] }}</td>
          </tr>
        </tbody>
      </template>
      <ErrorAlert v-if="showAlert" class="parser__alert"></ErrorAlert>
    </table>
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
              let itemPhone = String(item['Phone'])
              let itemEmail = String(item['Email']).toLowerCase()
              let testItemPhone = String(users[j]['Phone'])
              let testItemEmail = String(users[j]['Email']).toLowerCase()

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
      // validations
      isAgeValid(age){
        const ageNum = Number(age)
        if(ageNum < 21 || isNaN(ageNum)){
          return false
        }else{
          return true
        }
      },
      isExperienceValid(exp, age){
        const expNum = Number(exp)
        const ageNum = Number(age)
        if(expNum > (ageNum - 21) || expNum < 0){                                            //?
          return false
        }else{
          return true
        }
      },
      isHasChildrenValid(has){
        const hasLowerCase = has.toLowerCase()
        if(hasLowerCase === 'true' || hasLowerCase === 'false' || hasLowerCase === ''){
          return true
        }else{
          return false
        }
      },
      isYearlyIncomeValid(income){
        const incomeNum = Number(income)
        const regexp = /^[0-9]+.[0-9]{2}$/
        if(!regexp.test(income) || incomeNum > 1000000 || incomeNum < 0){
          return false
        }else{
          return true
        }
      },
      isLicenseNumberValid(licenseNum){
        if(String(licenseNum).length === 6){
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
        const regexp = /^$/
        
        for(let obj of UStates){
          for(let key in obj){
            if(key === state || obj[key] === state){
              return obj[key]
            }
          }
        }
        return false
      },
      returnNumberIfValid(number){
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

.table{
  &__header{
    td{
      background-color: $table-header;
      font-weight: bold;
    }
  }
  &-row{
    td{
      padding: 10px;
    }
  }
  &__user{
    td.invalid{
      background-color: rgba(255, 38, 38, 0.363);
    }
  }
}
</style>