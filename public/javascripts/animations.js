var animationArr = new Array();
animationArr.push(a1);
animationArr.push(a2);
animationArr.push(a3);
animationArr.push(a6);
animationArr.push(a7);
animationArr.push(a9);
animationArr.push(a10);
animationArr.push(a11);

var _sequence = 0;

function sequential_animation()
{
    console.log(_sequence);
    var anim = animationArr[_sequence];
    _sequence++;
    return anim;

}

function random_animation() {
    var ran = Math.floor(Math.random() * animationArr.length);
    console.log('randomly ::' + ran);
    return animationArr[ran];
}

function playAnimation() {
    var animation = random_animation(); //uncomment this to run them randomly
    //var animation = sequential_animation(); //uncomment this to run them in sequence

    $.get("/display/newText", function (data) {
        console.log(data.text);
        animation(data.text);
    });
};

function onComplete(anim) {
    if (anim.completed) {
        anim.seek(0);
        playAnimation();
        $('.ml-container').hide();
    }
};

//a1


function a1(text) {

    $('#a1Container').show();

    if (text) {
        console.log($('#a1DisplayText'));
        $('#a1DisplayText').html(text);
    }

    $('#a1DisplayText').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    var _a1 = anime.timeline({ loop: false })
        .add({
            targets: '.ml1 .letter',
            scale: [0.3, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 600,
            delay: function (el, i) {
                return 70 * (i + 1)
            }
        }).add({
            targets: '.ml1 .line',
            scaleX: [0, 1],
            opacity: [0.5, 1],
            easing: "easeOutExpo",
            duration: 700,
            offset: '-=875',
            delay: function (el, i, l) {
                return 80 * (l - i);
            }
        }).add(
            {
                targets: '.ml1',
                opacity: 0,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 1000
            });

    _a1.complete = onComplete;

}

//a2

function a2(text) {

    $('#a2Container').show();

    if (text) {
        $('#a2DisplayText').html(text);
    }

    $('.ml2').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    var _a2 = anime.timeline({ loop: false })
        .add({
            targets: '.ml2 .letter',
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: function (el, i) {
                return 70 * i;
            }
        }).add({
            targets: '.ml2',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });

    _a2.complete = onComplete;

};

//a3

function a3(text) {

    $('#a3Container').show();

    if (text) {
        $('#a3DisplayText').html(text);
    }

    // Wrap every letter in a span
    $('.ml3').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    var _a3 = anime.timeline({ loop: false })
        .add({
            targets: '.ml3 .letter',
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 2250,
            delay: function (el, i) {
                return 150 * (i + 1)
            }
        }).add({
            targets: '.ml3',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });

    _a3.complete = onComplete;

}

//a6

function a6(text) {
    $('#a6Container').show();

    if (text) {
        $('#a6DisplayText').html(text);
    }


    // Wrap every letter in a span
    $('.ml6 .letters').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    var _a6 = anime.timeline({ loop: false })
        .add({
            targets: '.ml6 .letter',
            translateY: ["1.1em", 0],
            translateZ: 0,
            duration: 750,
            delay: function (el, i) {
                return 50 * i;
            }
        }).add({
            targets: '.ml6',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });

    _a6.complete = onComplete;
}

//a7

function a7(text) {

    $('#a7Container').show();

    if (text) {
        $('#a7DisplayText').html(text);
    }

    // Wrap every letter in a span
    $('.ml7 .letters').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    var _a7 = anime.timeline({ loop: false })
        .add({
            targets: '.ml7 .letter',
            translateY: ["1.1em", 0],
            translateX: ["0.55em", 0],
            translateZ: 0,
            rotateZ: [180, 0],
            duration: 750,
            easing: "easeOutExpo",
            delay: function (el, i) {
                return 50 * i;
            }
        }).add({
            targets: '.ml7',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });


    _a7.complete = onComplete;

}

function a9(text) {

    $('#a9Container').show();

    if (text) {
        $('#a9DisplayText').html(text);
    }

    // Wrap every letter in a span
    $('.ml9 .letters').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    var _a9 = anime.timeline({ loop: false })
        .add({
            targets: '.ml9 .letter',
            scale: [0, 1],
            duration: 1500,
            elasticity: 600,
            delay: function (el, i) {
                return 45 * (i + 1)
            }
        }).add({
            targets: '.ml9',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });

    _a9.complete = onComplete;

}

function a10(text) {

    $('#a10Container').show();

    if (text) {
        $('#a10DisplayText').html(text);
    }

    // Wrap every letter in a span
    $('.ml10 .letters').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    var _a10 = anime.timeline({ loop: false })
        .add({
            targets: '.ml10 .letter',
            rotateY: [-90, 0],
            duration: 1300,
            delay: function (el, i) {
                return 45 * i;
            }
        }).add({
            targets: '.ml10',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });


    _a10.complete = onComplete;

}


function a11(text) {

    $('#a11Container').show();

    if (text) {
        $('#a11DisplayText').html(text);
    }

    // Wrap every letter in a span
    $('.ml11 .letters').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    var _a11 = anime.timeline({ loop: false })
        .add({
            targets: '.ml11 .line',
            scaleY: [0, 1],
            opacity: [0.5, 1],
            easing: "easeOutExpo",
            duration: 700
        })
        .add({
            targets: '.ml11 .line',
            translateX: [0, $(".ml11 .letters").width()],
            easing: "easeOutExpo",
            duration: 700,
            delay: 100
        }).add({
            targets: '.ml11 .letter',
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 600,
            offset: '-=775',
            delay: function (el, i) {
                return 34 * (i + 1)
            }
        }).add({
            targets: '.ml11',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });


    _a11.complete = onComplete;

}

// onLoad
$('.ml-container').hide();
playAnimation();


