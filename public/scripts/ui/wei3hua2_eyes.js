wei3hua2.ui_eyes = (function(myPosition) {
    var util = wei3hua2.ui_util;

    var eyesNormal = 'img/wei3hua2_eyes_normal.png';

    var eyesItemImg = wei3hua2.images[eyesNormal];
    var eyesItem;

    var eyesBuffer = {
        x : 45,
        y : 65
    };

    var leftPupilBuffer = {
        x : 40,
        y : 25
    };
    var rightPupilBuffer = {
        x : 60,
        y : 25
    };
    var defaultPupilPosition = {
        left : {
            x : myPosition.x + eyesBuffer.x + leftPupilBuffer.x,
            y : myPosition.y + eyesBuffer.y + leftPupilBuffer.y
        },
        right : {
            x : myPosition.x + eyesBuffer.x + rightPupilBuffer.x,
            y : myPosition.y + eyesBuffer.y + rightPupilBuffer.y
        }
    };

    var radius = 3, fill = 'black';

    var pupil = {
        left : new Kinetic.Circle({
            radius : radius,
            fill : fill
        }),
        right : new Kinetic.Circle({
            radius : radius,
            fill : fill
        })
    };

    var mainLayer;

    this.init = function(layer) {
        mainLayer = layer;
        var defaultPos = defaultPupilPosition;
        setPupilPosition(defaultPos.left, defaultPos.right);
        
        
        util.initImgItem(eyesItemImg, function(kImage){
            eyesItem = kImage;

            layer.add(eyesItem);
            layer.add(pupil.left);
            layer.add(pupil.right);
        }, myPosition, eyesBuffer);
    }


    var proximityDistance = 5;
    this.trackMouseLocation = function(mousePos) {
        var left = computeMouseTrackPos(mousePos,defaultPupilPosition.left);
        var right = computeMouseTrackPos(mousePos,defaultPupilPosition.right);
        
        setPupilPosition(left,right);
        
        mainLayer.draw();
    }
    var computeMouseTrackPos = function(mousePos, defaultPupil){
        var newPosX = defaultPupil.x;
        var newPosY = defaultPupil.y;
        
        if(mousePos!==undefined){
            (mousePos.x < newPosX)? newPosX -= proximityDistance : newPosX += proximityDistance; 
            (mousePos.y < newPosY)? newPosY -= proximityDistance : newPosY += proximityDistance;
        }
        
        return {
            x : newPosX, y : newPosY
        };
    }
    

    var setPupilPosition = function(leftPos, rightPos) {
        pupil.left.setX(leftPos.x);
        pupil.left.setY(leftPos.y);

        pupil.right.setX(rightPos.x);
        pupil.right.setY(rightPos.y);
    }
});
