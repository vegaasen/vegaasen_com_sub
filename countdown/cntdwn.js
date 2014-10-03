/**
 * Simple configuration of the angular stuff which is being used by the countdown itself
 * @author vegaasen
 */
const END_TIME = new Date(2014, 9, 31, 23, 59);
const HAPPENING = '@vegaasen leaves Telenor';
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

angular
    .module('appCountDown', [])
    .controller("countdownController", function ($scope, $timeout) {
        $scope.remaining = remainingDays(END_TIME, new Date());
        $scope.happening = HAPPENING;
        var poll = function () {
            $timeout(
                function () {
                    $scope.remaning = remainingDays(END_TIME, new Date());
                    poll();
                },
                200);
        };
        poll();
    })
    .directive("latch", function () {
        return {
            templateUrl: "components/the-latch.html"
        };
    })
    .directive("information", function () {
        return {
            restrict: 'A',
            scope: {
                happening: '='
            },
            template: "Until {{happening}}"
        };
    });

function remainingDays(e, s) {
    var timeLeft = e.getTime() - s.getTime();
    return {
        timeLeft: (timeLeft > 0),
        days: conditionallyPrependZero(~~(timeLeft / DAY)),
        hours: conditionallyPrependZero(~~((timeLeft % DAY) / HOUR)),
        minutes: conditionallyPrependZero(~~((timeLeft % HOUR) / MINUTE)),
        seconds: conditionallyPrependZero(~~((timeLeft % MINUTE) / SECOND)),
        endDate: {
            year: e.getFullYear(),
            month: conditionallyPrependZero(e.getMonth()+1),
            day: conditionallyPrependZero(e.getDate()),
            hour: conditionallyPrependZero(e.getHours()),
            minute: conditionallyPrependZero(e.getMinutes())
        }
    };
}

function conditionallyPrependZero(n) {
    return (n > 0 && n > 9) ? n : "0" + n;
}