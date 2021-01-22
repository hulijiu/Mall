**解决首页中Better-Scroll可滚动区域的问题**
better-scroll在决定有多少区域可以滚动时，是根据scrollerHeight属性决定
   .scrollerHeight 属性是根据Better-Scroll的content中子组件的高度
   。但是我们在首页中，刚开始计算scrollerHeight属性时，是没有将图片计算在内的
   。所以计算出来的高度是错误的，而后来图片加载进来之后有了新的高度，但是scrollerHeight属性并没有进行更新，所以滚动出现了问题

 如何解决？
    监听每一张图片是否加载完成，只要有一张图片加载完成，执行一次refresh()
    。如何监听图片加载完成？
       1.原生的js监听图片：img.onLoad=function(){}
       Vue中监听：@load="方法"
       2.调用scroll的refresh()
       **事件总线**


    如何将GoosListItem中的事件，传递到Home.vue中？
    因为涉及到非父子组件通信，所以我们这里选择了**事件总线**  $bus
    1.Vue.protoType.$bus=new Vue()
    this.$bus.$emit('事件名称'，参数)
    this.$bus.$on("事件名称"，回调函数(参数))



    goodslistitem 中通过load监听img加载
    然后通过this.$bus.$emit发射事件给home.vue
    home.vue中通过this.$bus.$on来监听imgload事件，
    然后调用this.$refs.scroll.refresh()

    sroll.vue---refresh()   scroll初始化在mounted


    防抖函数debounce和节流函数throttle
    对于refresh调用非常频繁的问题，我们可以用防抖函数
    防抖函数起作用的过程：
       如果我们直接执行refresh,那么refresh函数会被执行30次
       可以将我们的refresh函数传入到的debounce中生成一个新的函数
       而生成的新函数，并不会频繁的调用，如果下一次执行来的非常快，那么会将上一次的执行取消掉；
       debounce(func,delay){
         let timer=null
         return function(...args){
           if (timer) clearTimeout(Timer)
            timer=setTimeOut(()=>{
             func.apply(this,args)
            },delay)
         }
       }


**上拉加载更多**
1.监听滚动到底部
pullUpLoad：属性

**tabControl的吸顶效果**
   要知道滚动到多少的时候实现吸顶效果就需要获取到tabControl的offsetTop属性
   。必须知道滚动到多少时，开始有吸顶效果，这个时候就需要获取tabControl的offsetTop
    .但是如果在直接在mounted中获取该值是不正确的，因为图片没有加载完成，所以获取的值不正确
    。如何获取正确的值？
       监听HomeSwiper中的img的加载完成
         加载完成后发出事件，在Home.vue中获取正确的值
         为了不让Homeswiper多次发出事件
         可以使用isLoad变量进行状态记录
         *注意这里不进行多次调用和debounce的区别*
     **监听滚动，动态的改变tabControl的样式**
     **动态改变样式时会出现2个问题**
     1.下面的商品内容会，会突然上移
     2.tabControl虽然设置了fixed，但是也随着Better-scroll一起滚出去了
     **最终解决方案**
     1.在最上面，也就是home-nav底下复制了一份 palaceholder tabControl组件对象，利用它来实现停留效果
     2.当用户滚到一定位置时，palaceholder tabControl显示出来
     3.当用户没有滚动到一定位置时placeholderTabctrol隐藏起来
        
      
**让Home保持原来的状态**
*让Home不要随意销毁掉*
  keep-alive
*让Home中的内容保持原来的位置*
  离开时，保存一个位置信息
  进来时将位置设置为原来保存的位置SaveY信息即可
