## Awesome countdown

<!-- [![npm version](https://badge.fury.io/js/awesome-countdown.svg)](https://badge.fury.io/js/awesome-countdown) -->
<!-- [![GitHub version](https://badge.fury.io/gh/mnossa%2Fawesome-countdown.svg)](https://badge.fury.io/gh/mnossa%2Fawesome-countdown) -->


### Install
`npm install awesome-countdown`


### Usage
```shell
const AwesomeCountdown = require("../index");
const moment = require("moment");
const END_DATE = moment().add(1, 'year').add(9, 'week');

let c = new AwesomeCountdown({
    callback: function () {
        console.log('AwesomeCountdown callback');
    },
    end: END_DATE,
    claim: `<div class="button" onClick="echo();" >timer is set to ${END_DATE}</div>`,
    domId: 'demo',
    lang: {
        "LABELS": {
            "YEARS": "years",
            "MONTHS": "months",
            "DAYS": "days",
            "HOURS": "hours",
            "MINUTES": "minutes",
            "SECONDS": "seconds"
        }

    }
});

c._run();
```


### Parameters
Name | Description | Required | Type | Default
-----|-------------|----------|------|--------
callback|a callback function called at the end of countdown|false|function|null
start|time to start the countdown|false|string YYYY-MM-DD HH:mm:ss or moment|moment()
end|time to end the countdown|true|string YYYY-MM-DD HH:mm:ss or moment|null
showYear|show year value|false|boolean|true
showMonth|show month value|false|boolean|true
showDay|show day value|false|boolean|true
showHour|sho howr value|false|boolean|true
showMinute|sho minute value|false|boolean|true
refreshRate|countdown refresh rate|false|milliseconds|1000 ms
hidden|hide the countdown|false|boolean|false
claim|the text displayed under the countdown|false|string|null
class|a custom class for the countdown|false|string|null
domId|dom ID where put countdown in|false|string|null
lang|language for the labels|false|string or object|en


### Methods
Name | Description
-----|------------
_run|start the countdown
_reset|reset the countdown
_stop|stop the countdown


### Demo
[view Demo](https://matteonossa.it/packages/awesome-countdown)


### License
Code released under [MIT License](https://github.com/mnossa/awesome-countdown/blob/master/LICENSE)


### Support me
Algorand: M5MTPYJXVW25PAWDAZTLGUN6QMJBMZ44T2675LHUK3QZFN4ZREXOFCUAGI