<template>
  <div>
    <input type="text" v-model="email"/>
    <button @click="sendData">SEND</button>
    <h1>{{value}}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      errors: [],
      value: ''
    }
  },

  // Gửi request lên server khi mà postPost() được gọi
  methods: {
    sendData(){
      let data = new FormData();
      data.append('email',this.email)
      axios.post(`http://192.168.1.11:5001/test`,data)
      .then(response => {
        this.value = response.data['data'];
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  },
  created(){
    
  }
}
</script>