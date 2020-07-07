## Awesome countdown

[![npm version](https://badge.fury.io/js/awesome-countdown.svg)](https://badge.fury.io/js/awesome-countdown)
[![GitHub version](https://badge.fury.io/gh/mnossa%2Fawesome-countdown.svg)](https://badge.fury.io/gh/mnossa%2Fawesome-countdown)


### Install
`npm install awesome-countdown`


### Usage
```shell
const AwesomeCountdown = require('awesome-countdown');

let date = "2099-12-31 23:59:59"; // or moment date


let claimCss = `
    cursor: pointer;
    border-radius: 25px;
    background: #000;
    color: #fff;
    display: inline-block;
    padding: 2px 30px;
`;

let claimAction = `
    alert('countdown 2');
`;

let c = new AwesomeCountdown({
    callback: function () {
        console.log('callback');
    },
    end: date,
    claim: `<div class="button" style="${claimCss}" onClick="${claimAction}" >press me</div>`,
    domId:'demo'
});

c._run();
```


### Parameters
Name | Description | Required | Default
-----|-------------|----------|--------
callback|a callback function called at the end of countdown|false|null
start|time to start the countdown|false|moment()
end|time to end the countdown|true|null
showYear|show year value|false|true
showMonth|show month value|false|true
showDay|show day value|false|true
showHour|sho howr value|false|true
showMinute|sho minute value|false|true
refreshRate|countdown refresh rate|false|1000 ms
hidden|hide the countdown|false|false
claim|the text displayed under the countdown|false|null
class|a custom class for the countdown|false|null
domId|dom ID where put countdown in|false|null


### Demo
[view Demo](https://matteonossa.it/packages/demo/awesome-countdown)


### License
Code released under [MIT License](https://github.com/mnossa/awesome-countdown/blob/master/LICENSE)


### Donate
![Ethereum](https://commons.wikimedia.org/wiki/File:Ethereum_logo_2014.svg =150x) 0x211d4614993388408090Fe13dbCF1924e2046BC5

![Bitcoin](https://commons.wikimedia.org/wiki/File:Bitcoin_logo.svg =150x) bc1quylvae686vzvc6dmshy3mcz3gfqpheaeee7dsv