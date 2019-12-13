import Meal from './Meal.js'

(function () {
  const API_URL = 'https://www.themealdb.com/api/json/v1/1'

  const MealService = function ($http) {
    const getRandomMeal = async function () {
      return $http.get(`${API_URL}/random.php`).then(response => {
        return new Meal(response.data.meals[0])
      })
    }

    const getMealsBySearch = async function (search) {
      const response = await fetch(
        `${API_URL}/search.php?s=${search}`
      )
      const data = await response.json()
      const random = Math.floor(Math.random() * data.meals.length)
      return new Meal(data.meals[random])
    }

    const getMealsByName = async function (name) {
      const response = await fetch(
        `${API_URL}/search.php?s=${name}`
      )
      const data = await response.json()
      return new Meal(data.meals[0])
    }

    const getCategories = async function () {
      try {
        const response = await fetch(
          `${API_URL}/categories.php`
        )
        const data = await response.json()
        const categoryList = []
        for (const category of data.categories) {
          categoryList.push(category.strCategory)
        }
        return categoryList
      } catch (e) {
        console.log('Error is: ' + e)
        return null
      }
    }

    const getMealsByCategory = async function (category) {
      try {
        const response = await fetch(
          `${API_URL}/filter.php?c=${event.target.innerHTML}`
        )
        const data = await response.json()
        const mealsList = []
        for (const meal of data.meals) {
          mealsList.push(meal.strMeal)
        }
        return mealsList
      } catch (e) {
        console.log('Error is: ' + e)
        return null
      }
    }

    return {
      getRandomMeal: getRandomMeal,
      getMealsBySearch: getMealsBySearch,
      getMealsByName: getMealsByName,
      getCategories: getCategories,
      getMealsByCategory: getMealsByCategory
    }
  }

  const module = angular.module('mainModule')
  module.factory('MealService', MealService)
})()
