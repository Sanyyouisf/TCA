app.controller("paintActivityCtrl", function($routeParams, $scope, AuthFactory, ChildFactory, $rootScope, $location, AvatarFactory, ChildActivityFactory, ActivityFactory) {

    $scope.childActivityId = "";
    $scope.activity = {};
    $scope.childActivity = {};

    let displayChildActivity = () => {
        ChildActivityFactory.getSingleChildActivity($routeParams.childActivityId)
            .then((result) => {
                $scope.childActivity = result;
                ActivityFactory.getSingleActivity(result.activityId)
                    .then((resultActivity) => {
                        $scope.activity = resultActivity;
                        ChildFactory.getSingleChild($scope.childActivity.childId)
                            .then((result) => {
                                $scope.selectedChild = result;
                                AvatarFactory.getSinglePicture($scope.selectedChild.pic)
                                    .then((image) => {
                                        $scope.selectedChild.url = image.path;
                                    });
                            });
                    })
                    .catch((error) => {
                        console.log("error", error);
                    });
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    displayChildActivity();


    $scope.completedChange = (completed) => {
        $scope.childActivity.childActivityId = $routeParams.childActivityId;
        ChildActivityFactory.editChildActivity($scope.childActivity)
            .then((resulted) => {
                $location.url(`/childProfile/${$scope.childActivity.childId}`);
            }).catch((error) => {
                console.log("inputChange error", error);
            });
    };

    //************
    //painting stuff
    //************
    var color = $(".selected").css("background-color");
    var $canvas = $("canvas");
    var context = $canvas[0].getContext("2d");
    var lastEvent;
    var mouseDown = false;

    //When clicking on control list items
    $(".controls").on("click", "li", function() {
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
        color = $(this).css("background-color");
    });

    //When "New Color" is pressed
    $("#revealColorSelect").click(function() {
        changeColor();
        $("#colorSelect").toggle();
    });

    //update the new color span
    function changeColor() {
        var r = $("#red").val();
        var g = $("#green").val();
        var b = $("#blue").val();
        $("#newColor").css("background-color", "rgb(" + r + "," + g + ", " + b + ")");
    }

    //When color sliders change
    $("input[type=range]").change(changeColor);
    //When "Add Color" is pressed
    $("#addNewColor").click(function() {
        //Append the color to the controls ul
        var $newColor = $("<li></li>");
        $newColor.css("background-color", $("#newColor").css("background-color"));
        $(".controls ul").append($newColor);
        //Select the new color
        $newColor.click();
    });

    //On mouse events on the canvas
    $canvas.mousedown(function(e) {
        lastEvent = e;
        mouseDown = true;
    }).mousemove(function(e) {
        //Draw lines
        if (mouseDown) {
            context.beginPath();
            context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
            context.lineTo(e.offsetX, e.offsetY);
            context.strokeStyle = color;
            context.stroke();
            lastEvent = e;
        }
    }).mouseup(function() {
        mouseDown = false;
    }).mouseleave(function() {
        $canvas.mouseup();
    });



});
