<template>
  <div style="border: 1px solid red;margin: 10px;">
    <h2>子组件</h2>
  </div>
</template>
 
<script>
export default {
    props:{
        name:{
            //类型 普通类型：字符串（String）、数字（Number）、布尔值（Boolean）、空（Null）引用类型：数组（Array）、对象（Object）
            /*其中，普通类型是可以在子组件中更改，不会影响其他兄弟子组件内同样调用的来自父组件的值，但是，引用类型的值，当在子组件中修改后，父组件的也会修改，那么后果就是，其他同样引用了改值的子组件内部的值也会跟着被修改。除非你有特殊的要求这么去做，否则最好不要这么做。*/
            type:String, 
            require:true,
            default: "",  //默认值
            validator: function (value) {   //验证器
                return value;
            }
        },
         
    },
  data () {
    return {
    }
  },
  mounted(){
  },
}
</script>