#pragma strict



var degrees : int = -90;	// How many degrees the pipe will Turn
var seconds : float = 5.0;	// How fast the pipe will rotate

internal var isRotating : boolean; // Internal boolean var used as for a breakout

function RotatePipe() {
	print("I have recieved message to Rotate");
	
	// I copied this portion of the code from the rotator prefab
	
	if (isRotating) return;
    isRotating = true;
 
    var startRotation = transform.rotation;
    var endRotation = transform.rotation * Quaternion.Euler(Vector3.forward * degrees);
    var t = 0.0;
    var rate = 1.0/seconds;
    while (t < 1.0) {
        t += Time.deltaTime * rate;
        transform.rotation = Quaternion.Slerp(startRotation, endRotation, t);
        yield;
    }
 
    isRotating = false;
	
}