#pragma strict

var speed = .5;
var length = .2;
internal var originalLocalPosition : Vector3;
var upDown = true;
 
function Start ()
{
    // when the object starts, we record its initial local position
    originalLocalPosition = transform.localPosition;
}
 
function Update ()
{

	if(upDown) {
		// Osculate along the y axis according to a sin function
    	transform.localPosition.y = originalLocalPosition.y + Mathf.Sin(Time.time * speed) * length;
    } else {
    	// Osculate along the x axis according to a sin function
    	transform.localPosition.x = originalLocalPosition.x + Mathf.Sin(Time.time * speed) * length;
    }
    
	/*	
	print("OrigPosLocal = " + originalLocalPosition);
	print("CurrPosLocal = " + transform.localPosition); 
	
	print("OrigPos = " + originalPosition);
	print("CurrPos = " + transform.position);    
	
    //print euler angles [TESTING CAN COMMENT OUT]
	var eux= transform.eulerAngles.x;
	var euy= transform.eulerAngles.y;
	var euz= transform.eulerAngles.z;
	print("x: " + eux + " y: " + euy + " z: " + euz);
	*/
}