kdApp.controller('liveController', function($scope, eventService){
    $scope.events = [];
    eventService.GET().then(function(data){
        console.log(data);
        $scope.events = data;
    });
});