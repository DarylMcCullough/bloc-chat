(function() {
    function Dates() {
        var Dates = {};
        
        var formatDate = function(date) {
            var year = date.getFullYear();
            var day = date.getDate();
            var month = date.getMonth();
            month = month + 1;
            if (month < 10) {
                month = "0" + month;
            }
            
            var hours = date.getHours();
            var ampm = "am";
            // 0 to 11 : 
            if (hours > 11) {
                ampm = "pm";
                hours = hours - 12;
            }
            
            if (hours == 0) {
                hours = 12;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            
            var minutes = date.getMinutes();
            
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            
            var seconds = date.getSeconds();
                       
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            
            return year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds;
        }
        
        Dates.now = function() {
            var date = Date();
            return formatDate(date);
        }
        
        return Dates;
    }

    angular
        .module('blocChat')
        .factory('Dates', [Dates]);
})();