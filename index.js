/**
 * Copyright (c) 2021, Matteo Nossa
 *
 *
 * @package AwesomeCountdown
 * @summary AwesomeCountdown NPM Package
 * @author Matteo Nossa <matteo@matteonossa.it>
 * @example https://matteonossa.it/packages/awesome-countdown
 *
 * Created at     : 2020-07-06 
 * Updated at     : 2021-06-23  
 * 
 */


const moment = require("moment");
const dom_document = require('./src/document');
require('moment-precise-range-plugin');


function AwesomeCountdown(args) {

    var _interval;
    let _self = this;

    this.output = new Proxy({ data: null }, {
        get: function (target, prop) {
            return Reflect.get(target, prop);
        },
        set: function (target, prop, value) {
            if (prop === 'data' && !_self.options.hidden && typeof document !== 'undefined') {
                dom_document._refresh(value, _self.options.uniq);
            }
            return Reflect.set(target, prop, value);
        }
    })

    this.options = {
        callback: args.callback || null,
        start: moment(args.start) || moment(),
        end: typeof args.end !== 'undefined' ? moment(args.end) : null,
        showYear: typeof args.showYear !== 'undefined' ? args.showYear : true,
        showMonth: typeof args.showMonth !== 'undefined' ? args.showMonth : true,
        showDay: typeof args.showDay !== 'undefined' ? args.showDay : true,
        showHour: typeof args.showHour !== 'undefined' ? args.showHour : true,
        showMinute: typeof args.showMinute !== 'undefined' ? args.showMinute : true,
        refreshRate: Math.abs(args.refreshRate) || 1000,
        hidden: typeof args.hidden !== 'undefined' ? args.hidden : false,
        claim: typeof args.claim !== 'undefined' ? args.claim : null,
        uniq: new Date().valueOf() + Math.random(),
        class: typeof args.class !== 'undefined' ? args.class : null,
        domId: typeof args.domId  !== 'undefined' ? args.domId : null,
        lang: typeof args.lang !== 'undefined' ? args.lang : 'en'
    }

    var _count = function() {
        var { start, end, callback } = _self.options;
        if (moment().isSameOrAfter(start)) {

            
            let r = moment.preciseDiff(end, moment(), true);

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
                clearInterval(_interval);
                if (typeof callback === "function") {
                    callback();
                }
            }
        }
    }

    this._run = function () {
        var {  end,  refreshRate, hidden } = _self.options;

        if (end === null) {
            throw 'end parameter is required';
        }

        if (!hidden && typeof document !== 'undefined') {
            dom_document._init(_self.options);
            _count();
        }

        _interval = setInterval(function () {
            _count();
        }, refreshRate);
    }

    this._reset = function () {
        clearInterval(_interval);
        AwesomeCountdown.call(this, _self.options);
    }

    this._stop = function () {
        clearInterval(_interval);
    }

}


module.exports = AwesomeCountdown;