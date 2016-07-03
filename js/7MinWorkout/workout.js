angular.module('7minWorkout')
// dependency injections here - $scope, $interval
.controller('WorkoutController', ['$scope', '$interval', function($scope, $interval){

'use strict';


    // workoutplan model
    function WorkoutPlan(args) {
        this.exercises = [];                    // contains objects in the format: {exercise: new Exercise({}), duration:30}
        this.name = args.name;
        this.title = args.title;
        this.restBetweenExercise = args.restBetweenExercise;
    }


    // exercise model
    function Exercise(args) {
        this.name = args.name;                  // should be unique
        this.title = args.title;                // shown to the user
        this.description = args.description;
        this.image = args.image;
        this.related = {};
        this.related.videos = args.videos;
        this.nameSound = args.nameSound;
        this.procedure = args.procedure;
    }


    var restExercise;
    var workoutPlan;
    var startWorkout = function() {
        workoutPlan = createWorkout();
        restExercise = {
            details: new Exercise({
                name: "rest",
                title: "Relax!",
                description: "Relax a bit! Take a break.",
                image: "img/rest.jpg",
            }),
            duration: workoutPlan.restBetweenExercise
        };
        startExercise(workoutPlan.exercises.shift());
    };

    var startExercise = function (exercisePlan) {
        $scope.currentExercise = exercisePlan;
        $scope.currentExerciseDuration = 0;
        // $interval service is a wrapper around window.setInterval - used to call currentExerciseDuration every 1000 ms (1 sec)
        // see docs for details: https://docs.angularjs.org/api/ng/service/$interval
        // args = fn to invoke
        $interval(function () {
            // $scope.currentExerciseDuration = $scope.currentExerciseDuration + 1;
            ++$scope.currentExerciseDuration;
        }, 
        // delay - between fx calls (ms)
        1000,
        // count - # of times to repeat
        $scope.currentExercise.duration)
        // using promise vs angular $watch
        .then(function () {
            var next = getNextExercise(exercisePlan);
            if ( next ) {
                startExercise(next);
            } else {
            }
        });
    };

    var getNextExercise = function(currentExercisePlan) {
        var nextExercise = null;
        if (currentExercisePlan === restExercise) {
            nextExercise = workoutPlan.exercises.shift();
        } else {
            if (workoutPlan.exercises.length !== 0) {
                nextExercise = restExercise;
            }
        }
        return nextExercise;
    };

    /*
    // exercise transitions implemented using angular $scope object $watch fn 
    // see: https://code.angularjs.org/1.4.12/docs/api/ng/type/$rootScope.Scope
    // $watch syntax: 
    // $scope.$watch(watchExpression, [listener], [objectEquality]);
    // watchExpression = string | fn to watch for changes
    // listener = invoked when watchExpression changes
    // objectEquality = boolean determines how changes are detected - ~ simple vs deep
        
    $scope.$watch('currentExerciseDuration', function(nVal) {
        if (nVal == $scope.currentExercise.duration) {
            var next = getNextExercise($scope.currentExercise);
            if (next) {
                startExercise(next); 
            } else {
                console.log('Workout complete!');
            }
        }
    });
    */

    // creates initial workout - 12 exercises from jumping jacks to side planks
    var createWorkout = function() {
        var workout = new WorkoutPlan({
            name: "7minWorkout",
            title: "7 Minute Workout",
            restBetweenExercise: 5
        });

        workout.exercises.push({
            details: new Exercise({
                name: "jumpingJacks",
                title: "Jumping Jacks",
                description: "Jumping Jacks.",
                image: "img/JumpingJacks.jpg",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 10
        });
        workout.exercises.push({
            details: new Exercise({
                name: "wallSit",
                title: "Wall Sit",
                description: "Wall Sit.",
                image: "img/wallsit.jpg",
                videos: [],
                variations: [],

            }),
            duration: 10
        });
        workout.exercises.push({
            details: new Exercise({
                name: "pushUp",
                title: "Push Up",
                description: "Description about pushup.",
                image: "img/pushup.jpg",
               videos: ["https://www.youtube.com/watch?v=Eh00_rniF8E", "https://www.youtube.com/watch?v=ZWdBqFLNljc", "https://www.youtube.com/watch?v=UwRLWMcOdwI", "https://www.youtube.com/watch?v=ynPwl6qyUNM", "https://www.youtube.com/watch?v=OicNTT2xzMI"],
                variations: ["Planche push-ups", "Knuckle push-ups", "Maltese push-ups", "One arm versions"],
                procedure: ""
            }),
            duration: 10
        });
        workout.exercises.push({
            details: new Exercise({
                name: "crunches",
                title: "Abdominal Crunches",
                description: "Abdominal Crunches.",
                image: "img/crunches.jpg",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 10
        });
        workout.exercises.push({
            details: new Exercise({
                name: "stepUpOntoChair",
                title: "Step Up Onto Chair",
                description: "Step Up Onto Chair.",
                image: "img/stepUpOntoChair.jpg",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 10
        });
        workout.exercises.push({
            details: new Exercise({
                name: "squat",
                title: "Squat",
                description: "Squat.",
                image: "img/squat.jpg",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 10
        });
        workout.exercises.push({
            details: new Exercise({
                name: "tricepdips",
                title: "Tricep Dips On Chair",
                description: "Tricep Dips On Chair.",
                image: "img/tricepdips.jpg",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 10
        });
        workout.exercises.push({
            details: new Exercise({
                name: "plank",
                title: "Plank",
                description: "Plank.",
                image: "img/plank.jpg",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 10
        });
        workout.exercises.push({
            details: new Exercise({
                name: "highKnees",
                title: "High Knees",
                description: "High Knees.",
                image: "img/highknees.jpg",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 10
        });
        workout.exercises.push({
            details: new Exercise({
                name: "lunges",
                title: "Lunges",
                description: "Lunges.",
                image: "img/lunges.jpg",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 10
        });
        workout.exercises.push({
            details: new Exercise({
                name: "pushupNRotate",
                title: "Pushup And Rotate",
                description: "Pushup And Rotate.",
                image: "img/pushupNRotate.jpg",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 10
        });
        workout.exercises.push({
            details: new Exercise({
                name: "sidePlank",
                title: "Side Plank",
                description: "Side Plank.",
                image: "img/sideplank.jpg",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 10
        });
        return workout;
    };  

    var init = function() {
          startWorkout();
    };  
    init();
}]);
