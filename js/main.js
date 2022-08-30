var parallaxInstance //第一頁視差使用
var scroll_start = false;
var page_now = 0;//現在的頁次
var section = document.querySelectorAll("main>section");
var last_page_index = section.length - 1;//最後一頁 

//換網址
var url=window.location.href;
var url_page = url.split("?page=")[1];
if (!isNaN(url_page)){//如果是數字
  page_now = url_page;
  if(page_now < 0) page_now=0;
  if(page_now >= last_page_index) page_now = last_page_index;
  move_page(page_now);
}


function wheel(e){
  if(page_now == last_page_index && e.wheelDelta < 0) return
  if(page_now == last_page_index && section[page_now].scrollTop > 150) return
  
  if(scroll_start) return ;
  scroll_start = true;
  var page_index = page_now;
  if (e.wheelDelta > 0) {
    page_index = page_index - 1;
  } else {
    page_index = page_index + 1;
  }
  
  if(page_index < 0) page_index = 0;
  if(page_index >= last_page_index) page_index = last_page_index;

  move_page(page_index);
 
}

function id(a){
    return document.getElementById(a)
  }   

function move_page(page_index){
  gsap.to(window, 0.5, {
    scrollTo: section[page_index],
    onStart : function(){

        if(page_index!=last_page_index){
            document.querySelectorAll("#section_4 .s_left")[0].classList.remove("fixed");      
    }
    gsap.set("#section_4 .s_left",{
        opacity:0
      })

    

    },onComplete : function(){


        if(page_index == last_page_index){
            document.querySelectorAll("#section_4 .s_left")[0].classList.add("fixed");
          }

  
                 

          id("number").addEventListener("click",function(event){
            // console.log(event.target,"event.target")
            let scroll_y = "max";
            if(event.target.innerHTML == "01") scroll_y = "#unit1";
            if(event.target.innerHTML == "02") scroll_y = "#unit2";
            if(event.target.innerHTML == "03") scroll_y = "#unit3";

            if(scroll_y == "max") return;

            let number_div = document.querySelectorAll("#number>div")
            for(var i=0;i<number_div.length;i++){
            number_div[i].classList.remove("active")
            }
            event.target.classList.add("active");


            
            gsap.to("#section_4", {
                duration: 1, 
                autoKill: true,
                scrollTo: {
                  y: scroll_y,
                  offsetY: 60,
                  autoKill: true
                }
              });
          })
          
          gsap.to("#section_4 .s_left",{
            opacity:1
    })
   

      window.history.pushState(null, null, "?page=" + page_index);

        

      page_now = page_index;
      setTimeout(function(){
        scroll_start = false;
      },1000)
    }
  });
}



function set_parallax(){
    //https://github.com/wagerfield/parallax
    var section_1 =  document.getElementById("section_1");
    parallaxInstance =  new Parallax(section_1)
  }


window.addEventListener('wheel', wheel);
document.addEventListener('DOMContentLoaded' , (event) =>{
    set_parallax()
})


  


