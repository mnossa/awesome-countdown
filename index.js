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
    args = args || {};

    var _interval = null;
    var _completed = false;
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
        callback: typeof args.callback === 'function' ? args.callback : null,
        onTick: typeof args.onTick === 'function' ? args.onTick : null,
        start: typeof args.start !== 'undefined' ? moment(args.start) : moment(),
        end: typeof args.end !== 'undefined' ? moment(args.end) : null,
        showYear: typeof args.showYear !== 'undefined' ? args.showYear : true,
        showMonth: typeof args.showMonth !== 'undefined' ? args.showMonth : true,
        showDay: typeof args.showDay !== 'undefined' ? args.showDay : true,
        showHour: typeof args.showHour !== 'undefined' ? args.showHour : true,
        showMinute: typeof args.showMinute !== 'undefined' ? args.showMinute : true,
        refreshRate: Math.max(1, Math.abs(Number(args.refreshRate)) || 1000),
        hidden: typeof args.hidden !== 'undefined' ? args.hidden : false,
        claim: typeof args.claim !== 'undefined' ? args.claim : null,
        uniq: new Date().valueOf() + Math.random(),
        class: typeof args.class !== 'undefined' ? args.class : null,
        domId: typeof args.domId  !== 'undefined' ? args.domId : null,
        lang: typeof args.lang !== 'undefined' ? args.lang : 'en'
    }

    this.getRemaining = function () {
        var { start, end } = _self.options;
        if (!start.isValid() || !end || !end.isValid()) {
            throw new Error('start and end must be valid dates');
        }

        if (moment().isSameOrAfter(end)) {
            return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        if (moment().isBefore(start)) {
            return null;
        }

        let r = moment.preciseDiff(end, moment(), true);

        if (!_self.options.showYear) {
            r.months += r.years * 12;
            r.years = 0;
        }
        if (!_self.options.showMonth) {
            r.days += Math.floor(r.months * (30.4167));
            r.months = 0;
        }
        if (!_self.options.showDay) {
            r.hours += r.days * 24;
            r.days = 0;
        }
        if (!_self.options.showHour) {
            r.minutes += r.hours * 60;
            r.hours = 0;
        }
        if (!_self.options.showMinute) {
            r.seconds += r.minutes * 60;
            r.minutes = 0;
        }

        return r;
    }

    var _count = function() {
        var { end, callback, onTick } = _self.options;
        var remaining = _self.getRemaining();
        if (remaining !== null) {
            _self.output.data = remaining;
            if (typeof onTick === 'function') {
                onTick(remaining, _self);
            }
        }

        if (moment().isSameOrAfter(end) && !_completed) {
            _completed = true;
            _self._stop();
            if (callback) {
                callback(_self);
            }
        }
    }

    this._run = function () {
        var {  end,  refreshRate, hidden } = _self.options;

        if (end === null) {
            throw new Error('end parameter is required');
        }
        if (!end.isValid()) {
            throw new Error('end parameter must be a valid date');
        }
        if (!this.options.start.isValid()) {
            throw new Error('start parameter must be a valid date');
        }

        this._stop();

        if (!hidden && typeof document !== 'undefined') {
            dom_document._init(_self.options);
        }
        _count();

        if (!_completed) {
            _interval = setInterval(_count, refreshRate);
        }
        return this;
    }

    this._reset = function () {
        clearInterval(_interval);
        _completed = false;
        AwesomeCountdown.call(this, _self.options);
        return this._run();
    }

    this._stop = function () {
        clearInterval(_interval);
        _interval = null;
        return this;
    }

    this.run = this._run;
    this.reset = this._reset;
    this.stop = this._stop;
}


module.exports = AwesomeCountdown;