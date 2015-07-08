// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function($scope, Camera) {

  $scope.mustachePhoto = function () {
    var $canvas = $('#renderingCanvas');
    var img = new Image();
    $canvas.parent().show();
    img.src = $scope.lastPhoto;
    img.onload = function () {
        var MAX_WIDTH = 200px;
//        var width = img.height; // note - image is rotated
//        var height = img.width;
        var width = MAX_WIDTH;
        var height = MAX_WIDTH * img.width / img.height;
        $canvas.height(height);
        $canvas.attr('height', height);
        $canvas.width(width);
        $canvas.attr('width', width);
        var context = $canvas[0].getContext('2d');
        context.save();
        context.rotate(90*Math.PI/180);
        context.drawImage(img, 0, -1*width, height, width);
        context.rotate(-90*Math.PI/180);

        // add mustache
        img = new Image();
        img.src = 'img/mustache_1.png';
        img.onload = function () {
            context.globalCompositeOperation="source-over";
            context.drawImage(img, 20, 300, 200, 300);

            $scope.updatedPhoto = {dataURL: $canvas[0].toDataURL()};
            $canvas.parent().hide();
            context.clearRect(0, 0, $canvas.width(), $canvas.height());
        }
    }
  };

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
  };

})

