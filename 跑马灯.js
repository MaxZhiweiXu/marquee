

let wrapper = document.querySelector('.wrapper');



/*
* 实现JS动画
*    让wrapper每间隔一段时间（最优动画时间是13～17MS）
*    在原有的left值基础上减去步长（想让动画快一些，步长就大一点）
*
*
*
* */



//实现无缝
//1。把wrapper中原有的li整体克隆一份，放到容器的末尾（无缝滚动）

wrapper.innerHTML+=wrapper.innerHTML;

utils.css(wrapper,'width',utils.css(wrapper,'width')*2);//因为克隆了一份，所以wrapper宽度变为之前的两倍
                             //先获取以下再乘以2


//JS中的定时器：间隔1000Ms执行一次这个方法，直到手动清除为止


/*setInterval(()=>{
    let curL = utils.css(wrapper,'left');
    curL -= 2;


    utils.css(wrapper,{
        left:curL
    });
    /!*console.log(utils.css(wrapper,'left'));*!/
} ,13);*/

//2。基于定时器实现动画

setInterval(()=>{
    //获取当前wrapper的left值，减去步长，把最新的left值赋给元素即可
    let curL = utils.css(wrapper,'left'); //第一次为0
    curL -= 2;
    utils.css(wrapper, {
        left: curL
    });

    //实现无缝：当我们ul距离marqueeBox的左偏移已经是整个wrapper的一半宽度
//（第一组原始内通已经运动完成了，现在看到的是克隆后的），
// 此时我们让wrapper立即运动到left为零的位置即可
     if(Math.abs(wrapper.offsetLeft)>=utils.css(wrapper,'width')/2){
         utils.css(wrapper,'left',0);//立即回到开始位置
     }},13);





