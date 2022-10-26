<template>
  <div>
    <div class="row">
      <div class="col-2">

      </div>
      <div class="col-4">
        <div class="mb-6">
          <div id="preview">
            <img v-if="url" :src="url" />
          </div>
        </div>
      </div>
      <div class="col-4" id="imageBoxDetect">
        <fade-loader style="color: aqua;" v-if="checkLoading"></fade-loader>
        <div id="preview">
          <img alt=" " v-bind:src="'data:image/jpeg;base64,'+imageBase64" v-if="check_Image"/>
        </div>
      </div>
      <div class="col-2">
        
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Bank Name</th>
              <th scope="col">Bank Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{userName}}</td>
              <td>{{bankName}}</td>
              <td>{{bankNumber}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <input alt=" " class="form-control" type="file" id="formFile" @change="onFileChange" style="margin: 20px;"/>
        <button @click="getData">SEND</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'
export default {
  data() {
    return {
      url: null,
      path:'',
      bankName: '',
      bankNumber: '',
      userName: '',
      imageBase64: '',
      checkLoading: false,
      check_Image: false,
    }
  },
  components: {
    FadeLoader
  },
  methods: {
    onFileChange(e) {
      this.check_Image = false
      this.bankName = '',
      this.bankNumber = '',
      this.userName = '',
      this.imageBase64 = '',
      this.path = e.target.files[0];
      this.url = URL.createObjectURL(this.path);
      console.log(this.path);
    },
    getData(){
      this.checkLoading = true
      let formData = new FormData();
      formData.append('image',this.path)
      const path = 'https://hoctaptlus.xyz/detectObject'
      axios.post(path,formData)
      .then(res => {
        this.checkLoading = false
        this.check_Image = true
        this.userName = res.data['data'].string_userName,
        this.bankName = res.data['data'].string_bankName,
        this.bankNumber = res.data['data'].string_bankNumber,
        this.imageBase64 = res.data['data'].img_base64.split('\'')[1]
      }).catch(err => console.error(err))
    }
  }
}
</script>
<style>

  #preview {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #preview img {
    max-width: 100%;
    max-height: 350px;
  }

  #imageBoxDetect {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .row{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .table{
    margin: 10px;
    border: 1px solid black;
  }
  .table th {
    border: 1px solid black;
  }
  .table td {
    border: 1px solid black;
  }
</style>