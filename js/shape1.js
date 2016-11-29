function shape(canvas,copy,cobj){
    this.canvas=canvas;
    this.copy=copy;
    this.cobj=cobj;
    this.width=canvas.width;
    this.height=canvas.height;
    this.type="line";
    this.style="stroke";
    this.strokeStyle="#000";
    this.fillStyle="#000";
    this.lineWidth=1;
    this.history=[];
    this.sideNum=5;/*边的个数*/
    this.starNum=5;/*多角形*/
    this.isback=true;
    this.radius=10;
    this.erSize=10;
    this.flag=true;
}
 shape.prototype={
    init:function(){
        this.cobj.lineWidth=this.lineWidth;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.fillStyle=this.fillStyle;
    },
    draw:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.copy.onmousemove=function(e){
                var endx= e.offsetX;
                var endy= e.offsetY;
                that.init();
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that.cobj.beginPath();
                that[that.type](startx,starty,endx,endy);
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }
        }
    },
    line:function(x,y,x1,y1){
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke();
    },
    rect:function(x,y,x1,y1){
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj[this.style]();
    },
     arc:function(x,y,x1,y1){
         //var w=Math.abs(())
         //var r=(x1-x)>(y1-y)?(x1-x):(y1-y);
         var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
         this.cobj.arc(x,y,r,0,2*Math.PI);
         this.cobj[this.style]();
     },
     polygon:function(x,y,x1,y1){
         /*多边形*/
         angle=360/this.sideNum*Math.PI/180;
         var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
         for(var i= 0;i<this.sideNum;i++){
             this.cobj.lineTo(Math.cos(i*angle)*r+x,Math.sin(i*angle)*r+y);
         }
         this.cobj.closePath();
         this.cobj[this.style]();
     },
     star:function(x,y,x1,y1){
         angle=360/this.starNum*Math.PI/180/2;
         var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
         var r1=r/3;
         for(var i= 0;i<this.starNum*2;i++){
             if(i%2==0){
                 this.cobj.lineTo(Math.cos(i*angle)*r+x,Math.sin(i*angle)*r+y);
             }else{
                 this.cobj.lineTo(Math.cos(i*angle)*r1+x,Math.sin(i*angle)*r1+y);
             }
         }
         this.cobj.closePath();
         this.cobj[this.style]();
     },
     pen:function(){
         var that=this;
         that.copy.onmousedown=function(e){
             var startx= e.offsetX;
             var starty= e.offsetY;
             that.init();
             that.cobj.beginPath();
             that.cobj.moveTo(startx,starty);
             that.copy.onmousemove=function(e){
                 var endx= e.offsetX;
                 var endy= e.offsetY;
                 that.cobj.clearRect(0,0,that.width,that.height);
                 if(that.history.length>0){
                     that.cobj.putImageData(that.history[that.history.length-1],0,0);
                 }
                 that.cobj.lineTo(endx,endy);
                 that.cobj.stroke();

             }
             that.copy.onmouseup=function(){
                 that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                 that.copy.onmousemove=null;
                 that.copy.onmouseup=null;
             }
         }
     },
     cut:function(eraser){
         var that=this;
         that.copy.onmousemove=function(e){
             if(!that.flag){
                 return false;
             }
             var endx= e.offsetX;
             var endy= e.offsetY;
             var lefts=endx-that.erSize/2;
             var tops=endy-that.erSize/2;
             if(lefts<0){
                 lefts=0;
             }
             if(lefts>that.width-that.erSize){
                 lefts=that.width-that.erSize;
             }
             if(tops<0){
                 tops=0;
             }
             if(tops>that.height-that.erSize){
                 tops=that.height-that.erSize;
             }
             eraser.css({
                 display:"block",
                 top:tops,
                 left:lefts,
                 width:that.erSize+"px",
                 height:that.erSize+"px"
             })
             that.cobj.clearRect(0,0,that.erSize,that.erSize);
         }
         that.copy.onmousedown=function(e){
             if(!that.flag){
                 return false;
             }
             var startx= e.offsetX;
             var starty= e.offsetY;
             that.init();
             //that.cobj.save();
             //that.cobj.beginPath();
             that.copy.onmousemove=function(e){
                 var endx= e.offsetX;
                 var endy= e.offsetY;
                 var lefts=endx-that.erSize/2;
                 var tops=endy-that.erSize/2;
                 if(lefts<0){
                     lefts=0;
                 }
                 if(lefts>that.width-that.erSize){
                     lefts=that.width-that.erSize;
                 }
                 if(tops<0){
                     tops=0;
                 }
                 if(tops>that.height-that.erSize){
                     tops=that.height-that.erSize;
                 }
                 eraser.css({
                     display:"block",
                     top:tops,
                     left:lefts,
                     width:that.erSize+"px",
                     height:that.erSize+"px"
                 })
                 that.cobj.save();
                 that.cobj.beginPath();
                 that.cobj.arc(endx,endy,that.radius,0,Math.PI*2,false);
                 that.cobj.clip();
                 that.cobj.clearRect(0,0,that.width,that.height);
                 that.cobj.restore();
             }
             that.copy.onmouseup=function(){
                 that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                 that.copy.onmousemove=null;
                 that.copy.onmouseup=null;
                 that.cut(eraser);
             }
         }
     },
     blur:function(dataObj,num,x,y){
         var that=this;
         var width=dataObj.width,height=dataObj.height;
         var arr=[];
         var num=num;
         for(var i=0;i<height;i++){//行
             for(var j= 0;j<width;j++){//列
                 var x1=j+num>width?j-num:j;
                 var y1=i+num>height?i-num:i;
                 dataObj=that.cobj.getImageData(x1,y1,num,num);
                 var r= 0,g= 0,b=0;
                 for(var k=0;k<dataObj.width*dataObj.height;k++){
                     r+=dataObj.data[k*4+0];
                     g+=dataObj.data[k*4+1];
                     b+=dataObj.data[k*4+2];
                 }
                 r=parseInt(r/(dataObj.width*dataObj.height));
                 g=parseInt(g/(dataObj.width*dataObj.height));
                 b=parseInt(b/(dataObj.width*dataObj.height));
//                        console.log(r + "--" + g + "--" + b);
                 arr.push(r,g,b,255);
             }
         }
         for(var i=0;i<dataObj.data.length;i++){
             dataObj.data[i]=arr[i];
         }
         that.cobj.putImageData(dataObj,x,y);
     },
     fx:function (dataObj,x,y){
         var that=this;
       for(var i=0; i<dataObj.width*dataObj.height;i++){
             dataObj.data[i*4+0]=255-dataObj.data[i*4+0];
             dataObj.data[i*4+1]=255-dataObj.data[i*4+0];
             dataObj.data[i*4+2]=255-dataObj.data[i*4+0];
             dataObj.data[i*4+3]=255;
          }
         that.cobj.putImageData(dataObj,x,y);
     },
     mas:function(dataObj,num,x,y){
         var that=this;
         var width=dataObj.width,height=dataObj.height;
         var num=num;
         var w=width/num;
         var h=height/num;
         for(var i=0;i<num;i++){
             for(var j= 0;j<num;j++){
                 dataObj=that.cobj.getImageData(j*w,i*h,w,h);
                 var r= 0,g= 0,b=0;
                 for(var k=0;k<dataObj.width*dataObj.height;k++){
                     r+=dataObj.data[k*4+0];
                     g+=dataObj.data[k*4+1];
                     b+=dataObj.data[k*4+2];
                 }
                 r=parseInt(r/(dataObj.width*dataObj.height));
                 g=parseInt(g/(dataObj.width*dataObj.height));
                 b=parseInt(b/(dataObj.width*dataObj.height));
                 for(var k=0;k<dataObj.width*dataObj.height;k++){
                     dataObj.data[k*4+0]=r;
                     dataObj.data[k*4+1]=g;
                     dataObj.data[k*4+2]=b;
                 }
                 that.cobj.putImageData(dataObj,x+j*w,y+i*h);
             }
         }
     }
     //er:function(eraser){
     //    var that=this;
     //    that.copy.onmousemove=function(e){
     //        var movex= e.offsetX;
     //        var movey= e.offsetY;
     //        var lefts=movex-that.erSize/2;
     //        var tops=movey-that.erSize/2;
     //        if(lefts<0){
     //            lefts=0;
     //        }
     //        if(lefts>that.width-that.erSize){
     //            lefts=that.width-that.erSize;
     //        }
     //        if(tops<0){
     //            tops=0;
     //        }
     //        if(tops>that.height-that.erSize){
     //            tops=that.height-that.erSize;
     //        }
     //        eraser.css({
     //            display:"block",
     //            top:tops,
     //            left:lefts,
     //            width:that.erSize+"px",
     //            height:that.erSize+"px"
     //        });
     //        that.cobj.clearRect(0,0,that.erSize,that.erSize);
     //    }
     //    that.copy.onmousedown=function(){
     //        that.copy.onmousemove=function(e){
     //            var movex= e.offsetX;
     //            var movey= e.offsetY;
     //             var lefts=movex-that.erSize/2;
     //             var tops=movey-that.erSize/2;
     //            if(lefts<0){
     //                lefts=0;
     //            }
     //            if(lefts>that.width-that.erSize){
     //                lefts=that.width-that.erSize;
     //            }
     //            if(tops<0){
     //                tops=0;
     //            }
     //            if(tops>that.height-that.erSize){
     //                tops=that.height-that.erSize;
     //            }
     //            eraser.css({
     //                display:"block",
     //                top:tops,
     //                left:lefts,
     //                width:that.erSize+"px",
     //                height:that.erSize+"px"
     //            });
     //        }
     //        that.cobj.clearRect(lefts,tops,that.erSize,that.erSize);
     //    }
     //}

}
