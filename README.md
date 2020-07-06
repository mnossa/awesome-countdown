## Awesome countdown

### Install
`npm install awesome-countdown`

### Usage
```shell
const Countdown = require('awesome-countdown');

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

let c = new Countdown({
    callback: function () {
        console.log('callback');
    },
    end: date,
    claim: `<div class="button" style="${claimCss}" onClick="${claimAction}" >press me</div>`,
    domId:'demo'
});

c._run();
```
### Demo
Work in progress

## License

[MIT License](https://github.com/mnossa/awesome-countdown/blob/master/LICENSE)