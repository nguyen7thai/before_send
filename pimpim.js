console.log("beginning")
var PIMPIM_CHECKLIST = [
  "CC cho sếp",
  "Xoa pim pim",
  "Khen anh be đẹp trai"
]


var toggleAllSend = function(isShow) {
  var xpath = "//*[text()='Send']";
  var sendButtons = document.evaluate("//*[text()='Send']", document, null, XPathResult.ANY_TYPE, null);
  var btn = sendButtons.iterateNext();
  while(btn) {
    btn.style.visibility = isShow ? 'visible' : 'hidden'; 
    btn = sendButtons.iterateNext();
  } 
}
$(document).on('focus', '[contenteditable]', function() {
  console.log("editting");
  toggleAllSend(false)
  $('.pimpim-check').prop('checked',false);
  if(window.pimpimPopup) {
    $('.pimpim-div').removeClass('getout')
    //    window.pimpimPopup
  } else {
    var checkDiv = $('<div/>')
    checkDiv.addClass('pimpim-div')
    var title = $('<div/>')
    title.addClass('title')
    title.text("Pim mặp Ú Ù U")
    checkDiv.append(title)
    var closeBtn = $('<span class="close">Close</span>')
    title.append(closeBtn)
    closeBtn.on('click', function() {
      $('.pimpim-div').addClass('getout')
    })

    chrome.storage.sync.get({"pimpimlist": PIMPIM_CHECKLIST}, function(data){
      $.each(data.pimpimlist, function(index, content){
        var row = $('<span/>')
        row.addClass('check-row')
        var checkBox = $('<input type="checkbox" />')
        checkBox.addClass('pimpim-check')
        var text = $('<span/>')
        text.addClass('check-text')
        text.text(content)
        row.append(checkBox) 
        row.append(text)
        checkDiv.append(row)

      })
      var imageContainer = $('<div class="image-container" />')
      var image = $('<img src="https://api.zaloapp.com/api/emoticon/sticker/webpc?eid=1002&size=130" />')
      image.addClass('xoa-image')
      imageContainer.append(image)
      imageContainer.append('Ngoan dữ')
      imageContainer.addClass('hidden')

      checkDiv.append(imageContainer)
      $('body').append(checkDiv)
      window.pimpimPopup = checkDiv;

      $('.pimpim-check').on('change', function() {
        var isShow = $('.pimpim-check:not(:checked)').length == 0
        toggleAllSend(isShow)
        if(isShow) {
          $('.image-container').removeClass('hidden') 

        } else {
          $('.image-container').addClass('hidden')}
      })
    })
  }

}
)  
