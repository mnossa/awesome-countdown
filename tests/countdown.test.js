const test = require('node:test');
const assert = require('node:assert/strict');
const AwesomeCountdown = require('../index');

test('returns a zeroed value and calls the completion callback once for an expired countdown', () => {
    let calls = 0;
    const countdown = new AwesomeCountdown({
        hidden: true,
        end: new Date(Date.now() - 1000),
        callback(instance) {
            calls += 1;
            assert.equal(instance, countdown);
        }
    });

    countdown.run();
    assert.deepEqual(countdown.output.data, {
        years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0
    });
    assert.equal(calls, 1);
    countdown.stop();
});

test('does not begin counting before the configured start date', () => {
    const countdown = new AwesomeCountdown({
        hidden: true,
        start: new Date(Date.now() + 60000),
        end: new Date(Date.now() + 120000)
    });

    assert.equal(countdown.getRemaining(), null);
    countdown.run();
    assert.equal(countdown.output.data, null);
    countdown.stop();
});

test('exposes public lifecycle aliases and validates dates', () => {
    const countdown = new AwesomeCountdown({ hidden: true });
    assert.equal(countdown.run, countdown._run);
    assert.equal(countdown.stop, countdown._stop);
    assert.throws(() => countdown.run(), /end parameter is required/);

    const invalid = new AwesomeCountdown({ hidden: true, end: new Date('invalid') });
    assert.throws(() => invalid.run(), /end parameter must be a valid date/);
});
