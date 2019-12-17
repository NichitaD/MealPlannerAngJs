function ImageController ($scope, $sce) {
  this.$onInit = function () {
    console.log(this)
  }

  $scope.trustSrc = function (src) {
    return $sce.trustAsResourceUrl(src)
  }

  $scope.playVideo = function () {
    $scope.videoState = 'showWindow'
  }

  $scope.closeVideo = function () {
    $scope.videoState = 'hideWindow'
    var iframes = document.getElementsByTagName('iframe')
    if (iframes != null) { // Reseting video by reasigning the source
      const videoSource = iframes[0].src
      iframes[0].src = videoSource
    }
  }
}

angular.module('mainModule')
  .component('imageWrapper', {
    templateUrl: '/src/imageWrapper/imageWrapper.html',
    controller: ImageController,
    bindings: {
      imageSource: '=',
      videoSource: '='
    }
  })
