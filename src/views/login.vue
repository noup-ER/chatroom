<script setup lang="ts">
import {useRouter} from "vue-router";
import {reactive,toRefs} from "vue"
import {Right} from "@element-plus/icons-vue"
import http from "@/http"

const router = useRouter();

const data = reactive({
  name:""
})

const {name} = toRefs(data)

const handleLogin = ()=>{
  http.get("/login",{
    params:{
      id:name.value
    }
  }).then(resBody=>{
    switch (resBody.code){
      case 200:
        ElMessage({type:"success",message:resBody.msg});
        window.sessionStorage.setItem("id",resBody.data.id);
        router.push({name:"room"})
        break
      case 600:
        ElMessage({type:"error",message:data.msg})
        break
    }
  }).catch()
}

</script>

<template>
  <div class="login-container">
    <el-input v-model="name" placeholder="请输入id" style="width: 200px" @keydown.enter="handleLogin"/>
    <el-button type="success" :icon="Right" circle style="margin-left: 10px" @click="handleLogin"/>
  </div>
</template>

<style scoped lang="scss">

.login-container{
  @include wh(100vw,100vh);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
