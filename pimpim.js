console.log("beginning")
var PIMPIM_CHECKLIST = [
  "CC cho sếp",
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
  if(window.pimpimPopup) {
    //    window.pimpimPopup
  } else {
    var checkDiv = $('<div/>')
    checkDiv.addClass('pimpim-div')
    var title = $('<div/>')
    title.addClass('title')
    title.text("Pim mặp Ú Ù U")
    checkDiv.append(title)

    $.each(PIMPIM_CHECKLIST, function(index, content){
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
    var image = $('<img src="https://api.zaloapp.com/api/emoticon/sticker/webpc?eid=1002&size=130" />')
    image.addClass('xoa-image')
    image.addClass('hidden')

    checkDiv.append(image)


    $('body').append(checkDiv)
    window.pimpimPopup = checkDiv;

    $('.pimpim-check').on('change', function() {
      var isShow = $('.pimpim-check:not(:checked)').length == 0
      toggleAllSend(isShow)
      if(isShow) {
        $('.xoa-image').removeClass('hidden') 

      } else {
        $('.xoa-image').addClass('hidden')}
    })
  }

}
)  
