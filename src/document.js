const Language = require("./lang");

const CLASSES = {
    CONTAINER: 'container',
    TIMER_CONTENT: 'timer_content',
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day',
    HOUR: 'hour',
    MINUTE: 'minute',
    SECOND: 'second',
    CLAIM_CONTENT: 'claim_content'
}

require("./lang/index");

module.exports = {
    className: function (str) {
        return `countdown__${str}`;
    },

    create: function (options) {

        let lang = Language(options.lang);

        let uniqueId = options.uniq;
        if (document.getElementById(this.className(CLASSES.CONTAINER) + '__' + uniqueId)) {
            return;
        }

        let container = this.domdom('div', {
            'id': [this.className(CLASSES.CONTAINER) + '__' + uniqueId],
            'class': [options.class !== null ? this.className(options.class) : this.className(CLASSES.CONTAINER)],
        })

        let timer_content = this.domdom('div', {
            'class': [this.className(CLASSES.TIMER_CONTENT)],
        })


        if (options.showYear) {
            timer_content.appendChild(
                this.domdom('span', {
                    'class': [this.className(CLASSES.YEAR), 'box'],
                    'id': [this.className(CLASSES.YEAR) + '__' + uniqueId],
                    'html': `<span class="unit"></span><span class="label">${lang.LABELS.YEARS}</span>`
                })
            );
        }

        if (options.showMonth) {
            timer_content.appendChild(
                this.domdom('span', {
                    'class': [this.className(CLASSES.MONTH), 'box'],
                    'id': [this.className(CLASSES.MONTH) + '__' + uniqueId],
                    'html': `<span class="unit"></span><span class="label">${lang.LABELS.MONTHS}</span>`
                })
            );
        }

        if (options.showDay) {
            timer_content.appendChild(
                this.domdom('span', {
                    'class': [this.className(CLASSES.DAY), 'box'],
                    'id': [this.className(CLASSES.DAY) + '__' + uniqueId],
                    'html': `<span class="unit"></span><span class="label">${lang.LABELS.DAYS}</span>`
                })
            );
        }

        if (options.showHour) {
            timer_content.appendChild(
                this.domdom('span', {
                    'class': [this.className(CLASSES.HOUR), 'box'],
                    'id': [this.className(CLASSES.HOUR) + '__' + uniqueId],
                    'html': `<span class="unit"></span><span class="label">${lang.LABELS.HOURS}</span>`
                })
            );
        }

        if (options.showMinute) {
            timer_content.appendChild(
                this.domdom('span', {
                    'class': [this.className(CLASSES.MINUTE), 'box'],
                    'id': [this.className(CLASSES.MINUTE) + '__' + uniqueId],
                    'html': `<span class="unit"></span><span class="label">${lang.LABELS.MINUTES}</span>`
                })
            );
        }

        timer_content.appendChild(
            this.domdom('span', {
                'class': [this.className(CLASSES.SECOND), 'box'],
                'id': [this.className(CLASSES.SECOND) + '__' + uniqueId],
                'html': `<span class="unit"></span><span class="label">${lang.LABELS.SECONDS}</span>`
            })
        );


        container.appendChild(timer_content);

        if (options.claim !== null) {
            let claim_content = this.domdom('div', {
                'class': [this.className(CLASSES.CLAIM_CONTENT)],
                'html': '' || `<span class="label">${options.claim}</span>`
            })
            container.appendChild(claim_content);
        }


        if (options.domId !== null) {
            let id = document.getElementById(options.domId);
            id.appendChild(container);
        } else {
            document.body.appendChild(container);
        }

    },

    update: function (value, uniqueId) {
        // console.log(uniqueId);
        if (document.getElementById(this.className(CLASSES.YEAR) + '__' + uniqueId)) {
            document.getElementById(this.className(CLASSES.YEAR) + '__' + uniqueId).getElementsByClassName('unit')[0].innerHTML = value.years;
        }

        if (document.getElementById(this.className(CLASSES.MONTH) + '__' + uniqueId)) {
            document.getElementById(this.className(CLASSES.MONTH) + '__' + uniqueId).getElementsByClassName('unit')[0].innerHTML = value.months;

        }

        if (document.getElementById(this.className(CLASSES.DAY) + '__' + uniqueId)) {
            document.getElementById(this.className(CLASSES.DAY) + '__' + uniqueId).getElementsByClassName('unit')[0].innerHTML = value.days;

        }

        if (document.getElementById(this.className(CLASSES.HOUR) + '__' + uniqueId)) {
            document.getElementById(this.className(CLASSES.HOUR) + '__' + uniqueId).getElementsByClassName('unit')[0].innerHTML = value.hours;

        }

        if (document.getElementById(this.className(CLASSES.MINUTE) + '__' + uniqueId)) {
            document.getElementById(this.className(CLASSES.MINUTE) + '__' + uniqueId).getElementsByClassName('unit')[0].innerHTML = value.minutes;

        }

        if (document.getElementById(this.className(CLASSES.SECOND) + '__' + uniqueId)) {
            document.getElementById(this.className(CLASSES.SECOND) + '__' + uniqueId).getElementsByClassName('unit')[0].innerHTML = value.seconds;
        }
    },
    domdom: function (type, args) {
        let s = document.createElement(type);

        if (args.class) {
            s.setAttribute('class', args.class.join(' '));
        }

        if (args.id) {
            s.setAttribute('id', args.id.join(' '));
        }
        if (args.html) {
            s.innerHTML = args.html;
        }

        return s;
    }
}