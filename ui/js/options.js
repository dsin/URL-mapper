var App = angular.module('App', ['ngMessages']);

App.controller('FormController', function($scope, $http, $q) {
  $scope.reloadTable = function(){
    chrome.storage.sync.get('URLmapping', function(items){
      var URLmapping = items['URLmapping'];

      $scope.URLmapping = URLmapping;
      $scope.$apply();
    });
  }
  $scope.edit = function(url){
    chrome.storage.sync.get('URLmapping', function(items){
      var URLmapping = items['URLmapping'];
      // copy up
      $scope.currentURL = url;
      $scope.redirectURL = URLmapping[url];
      $scope.$apply();
    });
  }
  $scope.delete = function(url){
    chrome.storage.sync.get('URLmapping', function(items){
      var URLmapping = items['URLmapping'];

      console.log(URLmapping);

      delete URLmapping[url];

      chrome.storage.sync.set({'URLmapping': URLmapping}, function() {
        $scope.reloadTable();
      });
    })
  }
  $scope.clear = function(){
    $scope.currentURL = '';
    $scope.redirectURL = '';
    $scope.mappingForm.$setPristine();
  }
  $scope.save = function(){
    chrome.storage.sync.get('URLmapping', function(items){
      var URLmapping = items['URLmapping'];
      if(!URLmapping)
        URLmapping = {};

      URLmapping[$scope.currentURL] = $scope.redirectURL;

      chrome.storage.sync.set({'URLmapping': URLmapping}, function() {
        $scope.reloadTable();
        $scope.clear();
      });
    });
  }
  $scope.submitForm = function(form){
    if(form.$valid) {
      $scope.save();
    }
  };
  $scope.reloadTable();
});
