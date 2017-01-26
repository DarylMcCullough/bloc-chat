 (function() {
    function SampleCtrl($scope, $firebaseObject) {
        var ref = firebase.database().ref();
  // download the data into a local object
  $scope.data = $firebaseObject(ref);
  // putting a console.log here won't work, see below
     }
     
     angular
         .module('sampleApp')
         .controller('AlbumCtrl', ['$scope', '$firebaseObject', SampleCtrl]);
 })();