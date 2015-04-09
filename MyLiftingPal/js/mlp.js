/*! myliftingpal v3.0.0 | (c) 2015 Taylor Hamling | myliftingpal.net */

function mlp(key){
   var self = {};
   self.key = key;
   self.url = 'http://www.myliftingpal.net/api/index.php';
   self.debug = false;
   self.result = [];
   self.session = '';
   self.async = false;
		if (self.session === '' && $.cookie("mlpsession") !== undefined){
			self.session = $.cookie("mlpsession");
		} 
    
   function loginCb(data){
       if (self.debug === true){
           console.log(data);
       }       
       self.result = $.parseJSON(data);
       if (self.result["success"] === true){
	   self.session = self.result["data"]["sessionid"];
	   $.cookie("mlpsession", self.session, {expires: 30});
	   }
       return self;
   }    
    
   function cb(data){
       if (self.debug === true){
           console.log(data);
       }
       self.result = $.parseJSON(data);
       return self;
   }
   
    self.call = function(controller, action, parameters, callback){
        var initialParameters = {key:self.key, session: self.session, controller : controller, action:action};
        var allParamters = $.extend(initialParameters, parameters);
        $.ajax({
            type: 'post',
            url: self.url,
            async: self.async,
            data: allParamters,
            success: callback,
			error:  function( jqXHR, textStatus, errorThrown ){console.log(jqXHR, textStatus, errorThrown);}
      });         
    };
   
   
   self.login = function(data){
        //username, password
        self.call('authentication','login', data, loginCb); 
		return self;		
   };
   self.loginFb = function(data){
        //(fb)id, name, email
        self.call('authentication','loginfb', data, loginCb); 
		return self;		
   };
   self.loginGp = function(data){
        //(gp)id, name
        self.call('authentication','logingp', data, loginCb); 
		return self;		
   };   

   self.logout = function(){
		
        self.call('authentication','logout', {}, cb); 
		self.session = '';
		$.removeCookie("mlpsession");	
		return self;		
   };  
    
   self.createUser = function(data){
	   //email,username,password
       self.call('create','createuser', data, cb);
	   return self;
   };
   
  
   
   self.createExercise = function(data){
	   //name,musclegroup,type
       self.call('create','createexercise', data, cb);
	   return self;
   };
       
   self.addStats = function(data){
	   //exerciseid, onerm
       self.call('create','addstats', data, cb);
	   return self;
   };
   
   self.createWorkout = function(data){
       //name
       self.call('create','createworkout', data, cb);
	   return self;
   };
   
   self.addExercise = function(data){
       //exerciseid, workoutid,ordering, reps, sets, rpe, weight, percentage
       self.call('create','addexercise', data, cb);
	   return self;
   };
   
   self.createProgram = function(data){
	   //name, duration
       self.call('create','createprogram', data, cb);
	   return self;
   };
   
   self.addWorkout = function(data){
	   //workoutid, programid, ordering, day
       self.call('create','addworkout', data, cb);
	   return self;
   };
   
   self.addResults = function(data){
       //exerciseid, workoutid, programid, reps, sets, rpe, weight, percentage
       self.call('create','addresults', data, cb);
	   return self;
   };
   
   self.addFriend = function(data){
       //friendid
       self.call('create','addfriend', data, cb);
	   return self;
   };   
   
   self.deleteUser = function(data){
	   //id
       self.call('edit','deleteuser', data, cb);
	   return self;
   };
   
   self.deleteExercise = function(data){
	   //id   
       self.call('edit','deleteexercise', data, cb);
	   return self;
   };
   
   self.removeStats = function(data){
	   //id   
       self.call('edit','removestats', data, cb);
	   return self;
   };
   
   self.deleteWorkout = function(data){
	   //id   
       self.call('edit','deleteworkout', data, cb);
	   return self;
   };
   
   self.removeExercise = function(data){
	   //id   
       self.call('edit','removeexercise', data, cb);
	   return self;
   };
   
   self.deleteProgram = function(data){
	   //id   
       self.call('edit','deleteprogram', data, cb);
	   return self;
   };
   
   self.removeWorkout = function(data){
	   //id   
       self.call('edit','removeworkout', data, cb);
	   return self;
   };
   
   self.removeResults = function(data){
       //id, exerciseid, assigneddate
       self.call('edit','removeresults', data, cb);
	   return self;
   };
   
   self.removeFriend = function(data){
       //friendid
       self.call('edit','removefriend', data, cb);
	   return self;
   };   
   
   self.updateUser = function(data){
	   //id,email,username,password, note
       self.call('edit','updateuser', data, cb);
	   return self;
   };
   
   self.updateProfile = function(data){
	   //id, userid, weight, gender, age, dp, about, why, goals
       self.call('edit','updateprofile', data, cb);
	   return self;
   };
   
   self.updateSettings = function(data){
	   //id,userid,emailpreferences,units
       self.call('edit','updatesettings', data, cb);
	   return self;
   };   
   
   
   self.updateExercise = function(data){
       //id, name,musclegroup,type
       self.call('edit','updateexercise', data, cb);
	   return self;
   };
   
   self.changeStats = function(data){
	   //id, exerciseid, onerm
       self.call('edit','changestats', data, cb);
	   return self;
   };
   
   self.updateWorkout = function(data){
	   //id, name	
       self.call('edit','updateworkout', data, cb);
	   return self;
   };
   
   self.changeExercise = function(data){
       //id, exerciseid, workoutid, ordering, reps, sets, rpe,weight,percentage
       self.call('edit','changeexercise', data, cb);
	   return self;
   };
   
   self.updateProgram = function(data){
       //id, name, duration
       self.call('edit','updateprogram', data, cb);
	   return self;
   };
   
   self.changeWorkout = function(data){
       //id, workoutid, programid, ordering, day
       self.call('edit','changeworkout', data, cb);
	   return self;
   };
   
   self.changeResults = function(data){
       //id, exerciseid, workoutid, programid, reps, sets, rpe, weight, percentage
       self.call('edit','changeresults', data, cb);
           return self;
    };
   
   self.getUsers = function(data){
       //id, email, username
       self.call('view','getusers', data, cb);
	   return self;
   };

   self.getUser = function(){ 
       self.call('view','getuser', {sessionid:self.session}, cb);
	   return self;
   }; 
   
   self.getExercises = function(data){
       //id, name,musclegroup,type,userid
       self.call('view','getexercises', data, cb);
	   return self;
   };
   
   self.getRequests = function(data){
       
       self.call('view','getrequests', data, cb);
           return self;
   }
   
   self.selectStats = function(data){
       //id, exerciseid
       self.call('view','selectstats', data, cb);
	   return self;
   };
   
   self.getData = function(data){
       //metric, type, exerciseid, timeframe
       self.call('view','getdata', data, cb);
	   return self;
   };    
   
   self.getMax = function(data){
       //exerciseid
       self.call('view','getmax', data, cb);
	   return self;
   };   
   
   self.getWorkouts = function(data){
       //id, name,userid
       self.call('view','getworkouts', data, cb);
	   return self;
   };
   
   self.selectExercises = function(data){
       //id, workoutid
       self.call('view','selectexercises', data, cb);
	   return self;
   };
   
   self.getPrograms = function(data){
       //id, name, userid
       self.call('view','getprograms', data, cb);
	   return self;
   };
   
   self.selectWorkouts = function(data){
       //id, programid
       self.call('view','selectworkouts', data, cb);
	   return self;
   };
   
   self.selectResults = function(data){
       //id,exerciseid,workoutid,programid,userid,reps,sets,rpe,weight,percent,assigneddate
       self.call('view','selectresults', data, cb);
	   return self;
   };
   
   self.getReport = function(data){
       //userid, reportstart, reportend, reporttype
       self.call('view','getreport', data, cb);
	   return self;
   };  
   
   self.removeReport = function(data){
       //filename
       self.call('edit','removereport', data, cb);
	   return self;
   };   
   
   self.resetPassword = function(data){
       //email
       self.call('edit','resetpassword', data, cb);
	   return self;
   };   
   
   self.inviteFriend = function(data){
       //email
       self.call('create','invite', data, cb);
	   return self;
   };   
   
   self.syncMfp = function(data){
       //(mfp) username, (mfp) password, date
       self.call('create','syncmfp', data, cb);
	   return self;
   };    

   return self;
}


