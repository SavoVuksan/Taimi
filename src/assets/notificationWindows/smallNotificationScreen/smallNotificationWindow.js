ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('notificationData',(event,m1,m2) =>{
  
  $('h1').html(m1);
  $('p').html(m2);
});
function closeWindow(){

  $(".notificationContainer").addClass('notificationContainerFadeOut');
  $(".notificationContainer").animate({
    opacity: 0,
  },1000,function(){
    window.close();
  });
}
let openTime = 15 * 1000;

setInterval(function(){
  closeWindow();
},openTime);
