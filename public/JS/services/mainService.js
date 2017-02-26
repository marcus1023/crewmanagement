angular.module('crewmanagement').service('mainService', function( $q, $http){

  this.serverTest = function(data){
    return $http({
      method: 'POST',
      url: "/api/serverTest",
      data: data
    })
  }
})
