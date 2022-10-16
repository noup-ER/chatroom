<script setup lang="ts">
import {reactive, toRefs} from "vue";

const id = window.sessionStorage.getItem("id");

const ws = new WebSocket(`ws://localhost:3032?id=${id}`);

ws.onmessage = (res)=>{
  const data = JSON.parse(res.data)
  //更新成员列表
  peopleOnlineList.value = data.allPeopleList || peopleOnlineList.value
  //更新聊天数据
  records.value = data.records || records.value
}


const data = reactive({
  name:id,
  peopleOnlineList:[],
  records:[],
  inputInfo:""
})

const {name,peopleOnlineList,records,inputInfo} = toRefs(data)

// 发送信息
function submitInfo(){
  ws.send(JSON.stringify(inputInfo.value))
}
</script>

<template>
  <div class="room-container">
<!--    主体-->
    <div class="chat-view-container">
<!--      头像信息-->
      <div class="personInfo-container">
        <span>{{name}}</span>
      </div>
<!--联系人信息-->
      <div class="relationshipInfo-container">
        <ul v-for="item in peopleOnlineList">
          <li>{{item}}</li>
        </ul>
      </div>
<!--      聊天信息-->
      <div class="chat-content-container">
        <ul class="ul-records" v-for="record in records">
<!--          他人单条聊天信息-->
          <li class="li-record" v-if="record.id !== name">
<!--            时间-->
            <span class="record-time">{{record.time}}</span>
<!--            信息-->
            <div class="record-body">
              <div class="profile-container">
                <div class="profile"></div>
              </div>
              <div class="name-content-container">
                <span>{{record.id}}</span>
                <section class="section-conent">
                  <span>{{record.content}}</span>
                </section>
              </div>
            </div>
          </li>
<!--          自己的记录-->
          <li class="li-record" v-else>
            <!--            时间-->
            <span class="record-time">{{record.time}}</span>
            <!--            信息-->
            <div class="record-body">
              <div class="name-content-container">
                <span>{{record.id}}</span>
                <section class="section-conent">
                    {{record.content}}
                </section>
              </div>
              <div class="profile-container">
                <div class="profile"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
<!--聊天工具-->
      <div class="chat-toolBar-container">
        <el-button type="primary" @click="submitInfo">submit</el-button>
      </div>
<!--输入框-->
      <div class="chat-input-container">
        <textarea class="textarea-input" v-model="inputInfo"></textarea>
      </div>
<!--其他信息-->
      <aside class="aside-info-container"></aside>
    </div>
  </div>
</template>

<style scoped lang="scss">
.room-container{
  @include wh(100vw,100vh);
  display: flex;
  justify-content: center;
  align-items: center;

  .chat-view-container{
    @include wh(80%,80%);
    border: 1px solid rebeccapurple;
    display: grid;
    grid-template-rows: repeat(10,1fr);
    grid-template-columns: repeat(10,1fr);

    .personInfo-container{
      grid-row: 1/3;
      grid-column: 1/3;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .relationshipInfo-container{
      grid-row: 3/11;
      grid-column: 1/3;
      border: 1px solid black;
      overflow: auto;
    }

    .chat-content-container{
      grid-row: 1/8;
      grid-column: 3/9;
      border: 1px solid black;
      overflow: auto;

      .ul-records{
        padding: 5px;
        .li-record{
          .record-time{
            display: block;
            text-align: center;
          }
          .record-body{
            display: flex;
            flex-wrap: nowrap;

            .profile-container{
              flex: 0.15;
              display: flex;
              justify-content: center;

              .profile{
                @include wh(40px,40px);
                border-radius: 50%;
                background-color: red;
              }
            }

            .name-content-container{
              flex: 0.85;
              display: flex;
              flex-direction: column;

              .section-conent{
                overflow-x: hidden;
                word-break: break-word;
                padding: 20px;
                position: relative;

                span{
                  position: relative;
                  z-index: 20;
                }

                &:before{
                  content: "";
                  position: absolute;
                  left: 15px;
                  right: 15px;
                  top: 15px;
                  bottom: 15px;
                  border-radius: 5px;
                  background-color: rgba(146,235,142,.4);
                  z-index: 19;
                }
              }
            }
          }
        }
      }
    }

    .chat-toolBar-container{
      grid-row: 8/9;
      grid-column: 3/9;
      text-align: right;
    }

    .chat-input-container{
      grid-row: 9/11;
      grid-column: 3/9;
      border: 1px solid black;

      .textarea-input{
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 5px;
      }
    }

    .aside-info-container{
      grid-row: 1/11;
      grid-column: 9/11;
    }
  }
}
</style>
