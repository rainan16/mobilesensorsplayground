function runOnLoad() {
    readOrientation();
    requestPermission();
}

function readOrientation() {
    if (!window.DeviceOrientationEvent) {
        document.getElementById('do-unsupported').classList.remove('hidden');
    } 
    else {
        document.getElementById('debug-co-info').classList.remove('hidden');

        window.addEventListener('deviceorientation', function(event) {
            document.getElementById('beta').innerHTML = Math.round(event.beta);
            document.getElementById('gamma').innerHTML = Math.round(event.gamma);
            document.getElementById('alpha').innerHTML = Math.round(event.alpha);
            document.getElementById('is-absolute').innerHTML = event.absolute ? "absolute" : "relative";
        });
    }

    if (!window.DeviceMotionEvent) {
        document.getElementById('dm-unsupported').classList.remove('hidden');
    } 
    else {
        document.getElementById('debug-ac-info').classList.remove('hidden');

        window.addEventListener('devicemotion', function(event) {
            document.getElementById('acceleration-x').innerHTML = Math.round(event.acceleration.x);
            document.getElementById('acceleration-y').innerHTML = Math.round(event.acceleration.y);
            document.getElementById('acceleration-z').innerHTML = Math.round(event.acceleration.z);
        });
    }
}

function doVibration() {
      if (window.navigator && window.navigator.vibrate) {
            navigator.vibrate(1000);      
      } 
      else {
        document.getElementById('v-unsupported').classList.remove('hidden');
        }
}

function requestPermission() {    
    if (!('Notification' in window)) {
        document.getElementById('na-unsupported').classList.remove('hidden');
    }
    else if (Notification.permission === "granted") {
        document.getElementById('na-granted').classList.remove('hidden');
        document.getElementById('na-granted').innerHtml = permission;
    }
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                document.getElementById('na-granted').classList.remove('hidden');
                document.getElementById('na-granted').innerHtml = permission;
            }
            else {
                document.getElementById('na-not-granted').classList.remove('hidden');
            }
        });
    }
  }

  function showNotification(notifyText) {
    if (('Notification' in window) && Notification.permission === "granted") {
        var notification = new Notification(notifyText);
    }
  }
