kdApp.factory('eventService', function(baseService, $q){
    var defer = $q.defer();
    var events = [];
    return {
        GET:function(){
            if(events.length == 0)
            {
                baseService.GET('configuration/events.json', '')
                    .then(function(res){
                        res.data.forEach(function(event){
                            event.date = new Date(event.date);
                            if(event.date >= new Date()){
                                events.push(event);
                            }
                        });
                        //events = res.data;

                       defer.resolve(events);
                    })
            }
            else{
                defer.resolve(events);
            }
            return defer.promise;
        }
    }
});