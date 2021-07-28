$(function () {  
  $(".decimal").keypress(function (e) {
    if ($(this).val().toString().indexOf('.') >= 1) {
      if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
      var decimalPlace = $(this).val().toString().indexOf('.') + 2;
      if ($(this).val().charAt(decimalPlace) != "") return false;
    } else {
      if (String.fromCharCode(e.keyCode).match(/[^0-9.]/g)) return false;
    }
  })
  
  $(".numericOnly").keypress(function (e) {
    if (String.fromCharCode(e.keyCode).match(/[^0-9.]/g)) return false;
  })
  
  $('#numberPeople').on('change', function (e) {
    if ($(this).val() == 0) {
      $('.numberPeopleError').text("Can't be zero")
      $('#numberPeople').addClass('error')
    } else {
      $('.numberPeopleError').text("")
      $('#numberPeople').removeClass('error')
    }
  
    computeTip()
  })
  
  $('#cost').on('change', function (e) {
    if ($(this).val() == 0) {
      $('.costError').text("Can't be zero")
      $('#cost').addClass('error')
    } else {
      $('.costError').text("")
      $('#cost').removeClass('error')
    }
  
    computeTip()
  })
  
  $('.percentBtn').on('click', function (e) {
    $('.percentBtn').removeClass('active')
    $(this).addClass('active')
  
    let percentValue = $(this).data('val')
    $('#percentValue').val(percentValue)
  
    computeTip()
  })
  
  $('.custom').on('change', function (e) {
    $('#percentValue').val($(this).val())
  
    if ($(this).val() >= 0) {
      $('.percentBtn').removeClass('active')
      $(this).addClass('active')
    }
  
    if ($(this).val() == "") {
      $(this).removeClass('active')
      $('.percentBtn[data-val="5"]').addClass('active')
      $('#percentValue').val(5)
    }
  
    computeTip()
  })
  
  $('.reset').on('click', function () {
    $('.percentBtn').removeClass('active')
    $('.percentBtn[data-val="5"]').addClass('active')
  
    $('.custom').removeClass('active')
    $('#percentValue').val(5)
  
    $('.decimal, .numericOnly').val('')
  
    $('.numberPeopleError').text("")
    $('#numberPeople').removeClass('error')
  
    $('.costError').text("")
    $('#cost').removeClass('error')
  
    computeTip()
  })
  
  function computeTip() {
    let bill = $('#cost').val()
    let percentage = $('#percentValue').val()
    let people = $('#numberPeople').val()
  
    console.log(bill, percentage, people)
  
    if (bill > 0 && percentage > 0 && people > 0) {
      let decimalPercentage = percentage / 100
      let billValue = decimalPercentage * bill
      let personVal = billValue / people
  
      $('#total').text(billValue.toFixed(2))
      $('#tipAmount').text(personVal.toFixed(2))
      console.log(billValue, personVal)
    } else {
      $('#total').text('0.00')
      $('#tipAmount').text('0.00')
    }
  
  }
})