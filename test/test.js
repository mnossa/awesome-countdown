// browserify test/test.js -o test/bundle.js -> compile and test on browser (http://localhost/dev-js/npm-countdown/test/browser.html OR file:///C:/Projects/JS/npm-countdown/test/browser.html)
// node test/test.js -> test on nodeJS

const Countdown = require("../index");
const moment = require("moment");


let claimCss = `
    cursor: pointer; 
    border-radius: 25px; 
    background: #000; 
    color: #fff;
    display: inline-block;
    padding: 2px 30px;
`;

let linkCss = `
    cursor: pointer; 
    border-radius: 25px; 
    color: #1b65d4;
    display: inline-block;
    padding: 2px 30px;
`;

let claimAction = `
    alert('countdown 2');
`;


let date = moment().add(1, 'year').add(9, 'week');

let t =  document.createElement('span');
t.innerHTML = `timer is set to ${date}`;
document.body.appendChild(t);


let c = new Countdown({
    callback: function () {
        console.log('Countdown callback');
    },
    end: date,
    claim: `<div class="button" style="${claimCss}" onClick="echo();" >press me</div>`,
});

c._run();



let c2 = new Countdown({
    callback: function () {
        console.log('Countdown 2 callback');
    },
    end: date,
    claim: `with custom class`,
    class: 'test_class',
});

c2._run();

let c3 = new Countdown({
    callback: function () {
        console.log('Countdown 3 callback');
    },
    end: date,
    claim: `another custom class`,
    class: 'test_class_2',
});

c3._run();

let c4 = new Countdown({
    callback: function () {
        console.log('Countdown 4 callback');
    },
    end: date,
    claim: `<div class="button" style="${claimCss}" onClick="${claimAction}" >press me</div>`,
    showYear:false,
    showMonth:false,
    showDay:false,
    showHour:false,
    showMinute:false,
});

c4._run();

let c5 = new Countdown({
    callback: function () {
        console.log('Countdown 5 callback');
    },
    end: date,
    showYear:false,
    showMonth:false,
    showDay:false,
    claim: `<a href="#" style="${linkCss}" >link</a>`,
});

c5._run();
