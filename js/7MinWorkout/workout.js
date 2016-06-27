angular.module('7minWorkout').
controller('WorkoutController', ['$scope', function($scope){

    var restExercise;
    var workoutPlan;

    function Exercise(args) {
        this.name = ars.name;                   // should be unique
        this.title = args.title;                // shown to the user
        this.description = args.description;
        this.image = args.image;
        this.related = {};
        this.related.videos = args.videos;
        this.nameSound = args.nameSound;
        this.procedure = args.procedure;
    }

    function WorkoutPlan(args) {
        this.exercises = [];                    // contains objects in the format: {exercise: new Exercise({}), duration:30}
        this.name = args.name;
        this.title = args.title;
        this.restBetweenExercise = args.restBetweenExercise;
    }

    var startWorkout = function() {
        workoutPlan = createWorkout();
        restExercise = {
            details: new Exercise({
                name: "rest",
                title: "Relax!",
                description: "Relax a bit! Take a break.",
                image: "img/rest.png",
            }),
            duration: workoutPlan.restBetweenExercise
        };
        startExercise(workoutPlan.exercises.shift());
    };

    var init = function() {
        startWorkout();
    };
    init();
}]);
