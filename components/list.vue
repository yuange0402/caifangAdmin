<template>
       <div class="list">
                <nuxt-link to='/detail' v-for="item in 10" :key='item'>
                 <div class="ski"></div>
                    <div class="listItem">
                        <div class="left">
                            <img class="lazy" src="http://imgs.julive.com/l?p=eyJpbWdfcGF0aCI6IlwvVXBsb2FkXC9wcm9qZWN0X2ltZ1wvMFwvMjAwMTMwNjNcLzIwMTkwOTA0MTczODUxNDkwLmpwZWciLCJpbWdfcGFyYW1fYXJyIjpbXSwieC1vc3MtcHJvY2VzcyI6IlwvcmVzaXplLHdfMjYwLGhfMTgwLG1fZmlsbFwvZm9ybWF0LHdlYnBcL3F1YWxpdHkscV85MCJ9_x1.25">
                        </div>
                        <div class="middle">
                            <div>碧桂园凤凰湾</div>
                            <div>地址 顺德-容桂 外环路45号码</div>
                            <div>户型 三居(7)、四居(6)、五居及以上(3)</div>
                            <div>面积 89-270㎡</div>
                            <div>
                                <span>住宅</span>
                                <span>2018年佛山全年销量较高楼盘</span>
                                </div>
                        </div>
                        <div class="right">
                                <div>均价<span>13500</span>元/㎡</div>
                                <div>参考总价：130-250万元</div>
                                <div>
                                    <span>冯丽清</span>
                                    <span>向他咨询</span>
                                </div>
                        </div>
                    </div>
                </nuxt-link>
      </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
  



      
    .list{
        // border: 2px solid darkcyan;
        width: 900px;
        margin-top: 30px;
        .listItem{
            display: flex;
            margin-top:50px;

            .middle{
                display: flex;
                flex-direction: column;
                margin-left:30px;
                justify-content: space-around;

                &>div:nth-of-type(1){
                    font-size: 20px;
                    color: black;
                    font-weight: 600;
                }
                &>div:nth-of-type(2){
                    color: #777;
                }
                &>div:nth-of-type(3){
                     color: #777;
                }
                &>div:nth-of-type(4){
                     color: #777;
                }
                &>div:nth-of-type(5){
                     color: #666;
                     margin-top: 20px;
                     font-size: 14px;
                     span{
                         background-color: #eee;
                         padding: 2px 5px;
                         border-radius: 5px;
                     }
                }
            }
            .left{
                width:300px;
                height:200px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius:10px;
                }
            }
            .right{
                padding-left:80px;
                // border: 1px solid red;
                display: flex;
                justify-content: center;
                flex-direction: column;
                div{
                    margin:10px;
                }

                div:nth-of-type(1){
                    color:#ff6d6f;
                    font-weight: 600;
                    span{
                        font-size: 30px;
                    }
                }
                div:nth-of-type(2){
                    color: #888;
                }
                div:nth-of-type(3){
                     font-weight: 600;
                }

            }

        }
    }

    // .rightfixed{
    //      border: 2px solid darkblue;
    //      position:sticky;
    //      width: 300px;
    //      height: 500px;
    //      right: 50px;
    //      top: 0;
    // }


</style>

<style>

</style>