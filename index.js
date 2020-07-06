// 'use strict';

const moment = require("moment");
require('moment-precise-range-plugin');

const dom = require('./src/document');

function Countdown(args) {

    var timer;
    let _self = this;

    this.output = new Proxy({ data: null }, {
        get: function (target, prop) {
            return Reflect.get(target, prop);
        },
        set: function (target, prop, value) {
            if (prop === 'data' && !_self.options.hidden && typeof document !== 'undefined') {
                display(value);
            }
            return Reflect.set(target, prop, value);
        }
    })

    this.options = {
        callback: args.callback || null,
        start: moment(args.start) || moment(),
        end: moment(args.end) || null,
        showYear: typeof args.showYear !== 'undefined' ? args.showYear : true,
        showMonth: typeof args.showMonth !== 'undefined' ? args.showMonth : true,
        showDay: typeof args.showDay !== 'undefined' ? args.showDay : true,
        showHour: typeof args.showHour !== 'undefined' ? args.showHour : true,
        showMinute: typeof args.showMinute !== 'undefined' ? args.showMinute : true,
        refreshRate: Math.abs(args.refreshRate) || 1000,
        hidden: typeof args.hidden !== 'undefined' ? args.hidden : false,
        claim: typeof args.claim !== 'undefined' ? args.claim : '',
        uniq: new Date().valueOf() + Math.random(),
        class: args.class || ''
    }


    var display = function (value) {
        dom.create(_self.options);
        dom.update(value);
    }

    this._run = function () {
        var { start, end, callback, refreshRate } = _self.options;

        timer = setInterval(function () {
            if (moment().isAfter(start)) {

                /**
                 * true parameter return also years, month and days. 
                 * EX:
                 * {
                 *   years: 0,
                 *   months: 0,
                 *   days: 0,
                 *   hours: 0,
                 *   minutes: 0,
                 *   seconds: 1,
                 *   firstDateWasLater: true
                 *   }
                 */
                let r = moment.preciseDiff(end, moment(), true);

                // console.log(_self.options.showYear);
                if (!_self.options.showYear) {
                    r.months += r.years * 12;
                }
                if (!_self.options.showMonth) {
                    r.days += Math.floor(r.months * (30.4167));
                }
                if (!_self.options.showDay) {
                    r.hours += r.days * 24;
                }
                if (!_self.options.showHour) {
                    r.minutes += r.hours * 60;
                }
                if (!_self.options.showMinute) {
                    r.seconds += r.minutes * 60;
                }

                _self.output.data =  r;

                if (moment().isSameOrAfter(end)) {
                    clearInterval(timer);
                    if (typeof callback === "function") {
                        callback();
                    }
                }
            }

        }, refreshRate);
    }

    this._reset = function () {
        clearInterval(timer);
        Countdown.call(this, _self.options);
    }

    this._stop = function () {
        clearInterval(timer);
    }

}


module.exports = Countdown;