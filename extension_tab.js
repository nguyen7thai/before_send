var PIMPIM_CHECKLIST = [
  "CC cho sếp",
  "Xoa pim pim",
  "Khen anh be đẹp trai"
]

window.currentPimList = []
var addRow = function(text, delCallback) {
  var row = $('<div/>') 
  row.addClass('todo-row')
  var deleteBtn = $('<span class="deleteBtn"/>')
  row.append(deleteBtn)
  deleteBtn.on('click', function(){
    delCallback()
    row.remove()
  }) 

  row.append(text)
  $('.todo-list').append(row)
}
document.addEventListener('DOMContentLoaded', function() {
  var currentPimList;
  var delCallback = function(index){
    return function(){
      currentPimList.splice(index, 1)
      chrome.storage.sync.set({ "pimpimlist": currentPimList }, function(){
      })
    } 
  }
  chrome.storage.sync.get({"pimpimlist": PIMPIM_CHECKLIST}, function(data){
    console.log(data)
    currentPimList = data.pimpimlist
    $.each(data.pimpimlist, function(index, item) {
      addRow(item, delCallback(index))
    })


  });

  $('form').on('submit', function(e){

    e.stopPropagation()
    e.preventDefault()
    var value = $('form input').val()
    currentPimList.push(value)
    addRow(value, delCallback(currentPimList.length -1)) 
    $('form input').val("")
    chrome.storage.sync.set({ "pimpimlist": currentPimList }, function(){
      //  A data saved callback omg so fancy
    }) 
  })
  //})
}, false);
