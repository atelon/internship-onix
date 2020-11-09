import $ from "../node_modules/jquery/dist/jquery.js";
import dateTimePicker from "./jquery.datetimepicker.js";
import mouseWheel from "./jquery.Mousewheel.js";
var store = require('store');
import { nanoid } from 'nanoid';

// Add to "trusted" in chrome://settings/content/sound if it not works
// Known issue - when remove last one reminder "#no-reminders" not shows up

let iHaveSpeach = false;

if ('speechSynthesis' in window) {
  iHaveSpeach = true;
  console.log('Text-to-speech supported.');
} else {
  console.log('Text-to-speech not supported.');
}

let speachHandler = (eventName) => {
  if (iHaveSpeach !== false) {

    let synthesis = window.speechSynthesis;

    // En only

    let voice = synthesis.getVoices().filter(function(voice) {
      return voice.lang === 'en';
    })[0];

    let utterance = new SpeechSynthesisUtterance(`Attention! Attention! ${eventName} event occured!`);
    // Set utterance properties
    utterance.voice = voice;
    utterance.pitch = 1.5;
    utterance.rate = 1.25;
    utterance.volume = 0.8;
    // Speak the utterance
    synthesis.speak(utterance);
  }
}

dateTimePicker($);
mouseWheel($);

// Not efficient way I stored data in local storage

function getMyPepe (){
  let that = this;
  let id = $(that).attr('id').slice(4);

  let remindersArray = store.get('reminders');
  let newArray = [];

  remindersArray.forEach(el => {
    if (el.id != id)
      newArray.push(el);
  });

  store.set('reminders', newArray);

  $(`#sssss-${id}`).remove();

}

let showReminders = () => {
  let remindersArray = store.get('reminders');
  let tplHead = `
    <div id="reminders-template" class="row justify-content-center container-fluid">
      <div class="col-md-8">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Time</th>
              <th scope="col">Time Left</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody id="tbbbody">`;
   let tplTail = `
          </tbody>
        </table>
      </div>
    </div>`;

  let currentTpl = tplHead;
  let timerArrayID = [];

  remindersArray.forEach(el => {
    currentTpl += `<tr id="sssss-${el.id}">
                    <th id="sada-${el.id}" scope="col">${el.eventName}</th>
                    <th id="s-b-${el.id}" scope="col">${el.eventTime}</th>
                    <th id="t-b-${el.id}" scope="col"></th>
                    <th scope="col">
                      <button id="r-b-${el.id}" type="button" class="btn colored-light-gray">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"></path><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path></svg>
                      </button>
                    </th>
                  </tr>`;
   timerArrayID.push({
     from: `s-b-${el.id}`,
     to: `t-b-${el.id}`,
     btn: `r-b-${el.id}`,
     evt: `${el.id}`
   });

  });

  currentTpl += tplTail;

  $("#my-container").append(currentTpl);

  timerArrayID.forEach(el => {

    let timer = setInterval(function(){
      let countDownDate = new Date($("#" + el.from).text()).getTime();
      let now = new Date().getTime();
      // console.log('countDownDate:' + countDownDate);
      // console.log('now:' + now);
      let distance = countDownDate - now;
      // console.log('distance: ' + distance);
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      $(`#${el.to}`).html(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(timer);
        $(`#${el.to}`).html("EXPIRED");
        speachHandler($(`#sada-${el.evt}`).text());
      }
    }, 1000);

    $(`#${el.btn}`).click(getMyPepe);


  });

}

let addToExistingReminders = (reminder) => {
  let tpl = `<tr id="sssss-${reminder.id}">
              <th id="sada-${reminder.id}" scope="col">${reminder.eventName}</th>
              <th id="s-b-${reminder.id}" scope="col">${reminder.eventTime}</th>
              <th id="t-b-${reminder.id}" scope="col"></th>
              <th scope="col">
                <button id="r-b-${reminder.id}" type="button" class="btn colored-light-gray">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"></path><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path></svg>
                </button>
              </th>
            </tr>`;
  $("#tbbbody").append(tpl);

  let timer = setInterval(function(){
    let countDownDate = new Date($("#" + `s-b-${reminder.id}`).text()).getTime();
    let now = new Date().getTime();
    // console.log('countDownDate:' + countDownDate);
    // console.log('now:' + now);
    let distance = countDownDate - now;
    // console.log('distance: ' + distance);
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    $(`#t-b-${reminder.id}`).html(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(timer);
      $(`#t-b-${reminder.id}`).html("EXPIRED");
      speachHandler($(`#sada-${reminder.id}`).text());
    }
  }, 1000);

  $(`#r-b-${reminder.id}`).click(getMyPepe);

}

$('#datetimepicker').datetimepicker({
  format:'Y-m-d H:i'
});

if ((typeof store.get('reminders') === 'undefined') || (store.get('reminders').length == 0)){
  $("#no-reminders").show();
}
else {
  $("#reminders-caption").show();
  showReminders();
}

$("#submitBtn").click(function() {
  if(!$("#titleReminder").val()){
    alert("Empty event name");
  }
  else {
    if(!$("#datetimepicker").val()){
      alert("Empty event time");
    }
    else {

      let eventName = $("#titleReminder").val();

      let eventTime;


      try {

        // console.log('datepicker before time: ', $("#datetimepicker").val());

        eventTime = new Date($("#datetimepicker").val());

        // console.log('datepicker after time: ', eventTime);

        let currentTime = new Date()

        if (eventTime.getTime() <= currentTime.getTime()) {

          alert("Can't set reminders for past time");
          return;
        }

      }
      catch(e) {

        alert("Not valid date");
        return;

      }

      $("#no-reminders").hide();
      $("#reminders-caption").show();

      if ((typeof store.get('reminders') === 'undefined') || (store.get('reminders').length == 0)){

          // console.log(`${eventTime.getFullYear()}-${eventTime.getMonth()}-${eventTime.getDate()} ${eventTime.getHours()}:${eventTime.getMinutes()}`);

          store.set('reminders', [
            {
              id: nanoid(),
              eventName: eventName,
              eventTime: `${eventTime.getFullYear()}-${eventTime.getMonth()+1}-${eventTime.getDate()} ${eventTime.getHours()}:${eventTime.getMinutes()}`
            }
          ])

          showReminders();
      }
      else {

         let remindersArray = store.get('reminders');
         let currReminder = {
              id: nanoid(),
              eventName: eventName,
              eventTime: `${eventTime.getFullYear()}-${eventTime.getMonth()+1}-${eventTime.getDate()} ${eventTime.getHours()}:${eventTime.getMinutes()}`
            };

         // I will not check for collisions. Running out of time...
         remindersArray.push(currReminder);

         store.set('reminders', remindersArray);

         addToExistingReminders(currReminder);

      }

      $('#titleReminder').val("");
      $('#datetimepicker').val("");
    }
  }
});

