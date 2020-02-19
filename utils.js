let utils = (function(){

    let setCss = function(curEle,attr,value){
        /*
        * 细节处理
        *  1。如果需要考虑IE6～8兼容，透明度这个样式在低版本浏览器中不是使用opacity，而是filter，（两套都要设置）
        *  2。如果传递进来的value值没有带单位，我们根据情况设置px单位
        *           =》某些样式属性才会加单位：width/weight/padding（left，right。。）
        *                                  margin（left，bottom。。）
        *                                  font-size
        *                                  top/bottom/left/right。。。
        *           =》用户自己传递的value值中是没有单位的
        * */
        if(attr==='opacity'){
            curEle.style.opacity = value;
            curELe.style.filter = 'alpha(opacity=${value*100})';
            return;}
        if(!isNaN(value)){
            //isNaN检测结果是false：说明value是纯数字，没有单位
            let reg = /^(width|height|fontSize)((margin|padding)?(top|left|right|bottom)?)$/i//    (i是忽略大小写)
            reg.test(attr)?value+='px':null;   //符合规则就加单位
        }
        curEle['style'][attr] = value;
    };

    let setGroupCss = function(curEle,options={}){
        //第二个参数是一个对象，设置一个默认值空对象

        //遍历传递的options，有多少键值对，就循环多少次，每一次都调去setCss方法逐一设置即可
        for(let attr in options){
            //fot-in 循环有自己的遍历顺序，先遍历数字后属性名（小到大）
            // 只遍历当前对象可枚举（可遍历）的属性  可枚举：私有属性（自己写的），
            //                                         浏览器内置属性一般是不可枚举的
            //                                         自己在类的原型上设置的属性也是可枚举的，例如：OBJECT。prototype.bbb
            //                                         一般情况下不想遍历这个bbb，因为可能是别人加上去的，解决办法加一句判断
            /*if(obj.hasOwnProperty(k)){
                return k;
            }*/

            if(!options.hasOwnProperty(attr)) {
                break;

            }   //不是私有的就break，因为能遍历到公有的，说明私有的已经遍历完了，可以直接break

            setCss(curEle,attr,options[attr]);

        }


    };

    let getCss = function getCss(curEle,attr){

        if('getComputedStyle' in window){
            let val = window.getComputedStyle(curEle,null)[attr];
            //把获取的结果去除单位，不是所有的值都能去单位，例如：display，还有一些复合值

            let reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
            reg.test(val)?val=parseFloat(val):null;
            return val;
        }
        //抛出一个错误（语法错误），让浏览器崩溃，不再继续执行JS
        throw new SyntaxError('您的浏览器版本过低，请升级至最新版本');
    }

    let css =function(...arg){
        let len = arg.length
            second = arg[1];
            fn = getCss;
        len>=3?fn=setCss:null;
        len===2 && (second instanceof Object)?fn=setGroupCss:null;
        return fn(...arg);
    }

    return {
        css
    }
})();

