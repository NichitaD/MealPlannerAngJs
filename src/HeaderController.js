
(function () {
  const app = angular.module('mainModule')

  const HeaderController = function ($scope, FilterService, MealService, $timeout) {
    MealService.getCategories().then(categories => {
      $scope.firstMenu = categories
    })

    $scope.searchForMeal = function (key) {
      if (key.key === 'Enter') {
        FilterService.filter('search', $scope.search)
      }
    }

    $scope.randomMeal = function () {
      FilterService.filter('random', $scope.search)
    }

    $scope.getSelectedMeal = function () {
      FilterService.filter('byName', event.target.innerHTML)
    }

    $scope.toggleMenu = function () {
      const menu = document.getElementById('menu_content')
      if (menu.style.opacity === '0') {
        menu.style.display = 'block'
        $timeout(function () {
          menu.style.opacity = 1
        }, 100)
      } else {
        menu.style.opacity = '0'
        document.getElementById('second_menu').style.opacity = '0'
        $timeout(function () {
          menu.style.display = 'none'
          document.getElementById('second_menu').style.display = 'none'
        }, 100)
      }
    }

    $scope.openSecondMenu = function () {
      MealService.getMealsByCategory(event.target.innerHTML).then(meals => {
        $scope.$parent.secondMenu = meals
        const menu = document.getElementById('second_menu')
        menu.style.display = 'block'
        $timeout(function () {
          menu.style.opacity = 1
        }, 100)
      })
    }

    $scope.toggleTheme = function () {
      const element = document.documentElement.style
      if (this.color === 'light' || this.color === undefined) {
        setTimeout(function () {
          document.getElementById('button').innerHTML = 'GET MEAL 🌮'
        }, 250)
        element.setProperty('--background-color', '#3d3d3d')
        element.setProperty('--title-color', 'white')
        element.setProperty('--h5-color', 'white')
        element.setProperty('--p-color', 'white')
        element.setProperty('--list-color', 'white')
        element.setProperty('--search-bar', '#5e5e5e')
        element.setProperty('--shadow', '#5e5e5e')
        document.getElementById('close_button').src = './images/close_dark.png'
        this.color = 'dark'
      } else {
        setTimeout(function () {
          document.getElementById('button').innerHTML = 'GET MEAL 🍔'
        }, 250)
        element.setProperty('--background-color', 'white')
        element.setProperty('--title-color', 'black')
        element.setProperty('--h5-color', '#4f4f4f')
        element.setProperty('--p-color', '#545454')
        element.setProperty('--list-color', '#6b6b6b')
        element.setProperty('--search-bar', 'white')
        element.setProperty('--shadow', 'rgba(0, 0, 0, 0.19)')
        document.getElementById('close_button').src = './images/close_light.png'
        this.color = 'light'
      }
    }

    window.onclick = function (event) {
      const video = document.getElementById('video_window')
      if (event.target === video) {
        document.getElementById('video_window').classList.add('hideWindow')
        video.classList.remove('showWindow')
        var iframes = document.getElementsByTagName('iframe')
        if (iframes != null) { // Reseting video by reasigning the source
          const videoSource = iframes[0].src
          iframes[0].src = videoSource
        }
      } else if (document.getElementById('menu_content').style.opacity === '1') {
        if (event.target.classList[0] !== 'category') {
          $scope.toggleMenu()
        }
      } else {
        document.getElementById('search').value = ''
      }
    }
  }
  app.controller('HeaderController', HeaderController)
})()
