**问题：如何将时间戳转成时间格式化字符串（常用）**
*时间戳：1535694719*
1.将时间戳转成Data对象：const date = new Date(1535694719*1000)
2.将data进行格式化，转成对应字符串
formatDate(date, fmt)

**普通做法**
this.currentIndex !==i &&((i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||
(i=== length-1 && positionY >= this.themeTopYs[i]))

条件成立：this.currentIndex ==! i   防止赋值过程过于频繁
条件二：((i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||
(i=== length-1 && positionY >= this.themeTopYs[i]))
*判断区间：在0和某个数字之间（i===length-1）*
(i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
*判断>= 的条件*
(i=== length-1 && positionY >= this.themeTopYs[i])
**hack做法**
    //positionY 和主题中的值进行对比
        //[0,1000,2000,3000，非常大的值]
        //positionY 在0和1000之间,index = 0
        //positionY 在1000和2000之间,index = 1
        //positionY 在2000和3000之间,index = 2
        //positionY 超过3000和一个非常大的值,index = 3

        this.getThemeTopY =debounce(()=>{
          this.themeTopYs=[]
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.commit.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommand.$el.offsetTop);
  ******this.themeTopYs.push(Number.MAX_VALUE)******
          console.log(this.themeTopYs);
        },500)
        
        
        所以判断条件可以不用区分空间：
        let length =  this.themeTopYs.length
        for(let i=0;i < length-1;i++){
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }


**数组常用的方法有哪些？push pop unshift shift sort reverse map filter reduce join**