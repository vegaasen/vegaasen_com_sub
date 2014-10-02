/**
 * Simple configuration of the angular stuff which is being used by the countdown itself
 * @author vegaasen
 */
const END_TIME = new Date(2014, 8, 30);
const HAPPENING = '@tomran leaves Telenor';
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

angular
    .module('appCountDown', [])
    .controller("countdownController", function ($scope, $timeout) {
        $scope.remaning = remainingDays(END_TIME, new Date());
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

function remainingDays(date1, date2) {
    var timeLeft = date1.getTime() - date2.getTime();
    return {
        timeLeft: timeLeft,
        days: conditionallyPrependZero(~~(timeLeft / DAY)),
        hours: conditionallyPrependZero(~~((timeLeft % DAY) / HOUR)),
        minutes: conditionallyPrependZero(~~((timeLeft % HOUR) / MINUTE)),
        seconds: conditionallyPrependZero(~~((timeLeft % MINUTE) / SECOND))
    };
}

function conditionallyPrependZero(n) {
    return n;
}