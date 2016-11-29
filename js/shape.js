function shape(canvas,cobj){
    this.canvas=canvas;
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
}
 shape.prototype={
    init:function(){
        this.cobj.lineWidth=this.lineWidth;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.fillStyle=this.fillStyle;
    },
    draw:function(){
        var that=this;
        that.canvas.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.canvas.onmousemove=function(e){
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
            that.canvas.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
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
     }
}

//function move(canvas,cobj){
//    this.canvas=canvas;
//    this.cobj=cobj;
//    this.width=canvas.width;
//    this.height=canvas.widht;
//    this.type="line";
//    this.style="stroke";
//    this.fillStyle="#000";
//    this.strokeStyle="#000";
//    this.lineWidth=1;
//    this.history=[];
//}
//move.prototype={
//    init:function(){
//        this.cobj.lineWidth=this.lineWidth;
//        this.cobj.fillStyle=this.fillStyle;
//        this.cobj.strokeStyle=this.strokeStyle;
//    },
//    draw:function(){
//        var that=this;
//        this.canvas.onmousedown=function(e){
//            var startx= e.clientX;
//            var starty= e.clientY;
//            that.canvas.onmousemove=function(){
//                var endx= e.clientX;
//                var endy= e.clientY;
//                that.conj.clearRect(0,0,that.width,that.height);
//                if(that.history.length>0){
//                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
//                }
//                that.cobj.beginPath();
//                that[cobj.type](startx,starty,endx,endy);
//            }
//            that.canvas.nomouseup=function(){
//                that.canvas.onmousemove=null;
//                that.canvas.onmouseup=null;
//                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
//            }
//        }
//    },
//    line:function(x,y,x1,y1){
//        this.cobj.moveTo(x,y);
//        this.cobj.lineTo(x1,y1);
//        thsi.cobj.stroke();
//    },
//    rect:function(x,y,x1,y1){
//        this.cobj.rect(x,y,x1-x,y1-y);
//        this.cobj[this.type]();
//    }
//}