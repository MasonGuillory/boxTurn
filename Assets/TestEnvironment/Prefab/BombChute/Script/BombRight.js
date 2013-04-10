#pragma strict

/*
*	BombChute v3-0	(BombRight script)
*	By: Felix Sotres (3/24/13)
*	
*	Added Functionality:
*		-Bomb imposes explosion force on the object (with rigidbody) it touches
*		-If bomb falls below y= -22 (world position) it will be destroyed
*		-If bomb hits a bombChute it will bounce the right way and be destroyed
*
*	Functionality Overview:
*		-Bomb will bounce right when it touches any platform
*		-Bomb will be destoryed after colliding with any object, and platform (after 3 bounces)
*
*	Setup:
*		-Please tag all platforms as "Platform"
*		-Please tag all bombChutes as "BombChute"
*
*	Note:
*		-You may have to play with some of the variables (force, power)
*/

var bounceCounter : int = 3;	//keeps record of number of bounces
var force : int = 55;		//force to push bomb with (left/right)
var dir : int = 0;			//direction to move bomb in (1=left, else right)
var balloonPosition: Vector3 = Vector3(0,0,0);	//vector used to test fall
//explosive force variables
var power : float = 100.0;
var radius : float= 2.0;
var upModifier : float = 0.0;

function Start () {
	//Do nothing
}

function Update () {
	//if transform falls really low, then kill object
	balloonPosition= this.transform.position;	//on update get current transform
	//if the balloon falls past a certain point, destroy it
	if(balloonPosition.y < -22){
		Destroy(this.gameObject, .2); //destroy after .2 seconds
	}
}
//get direction of bomb
function getDirection(){
	if(dir==1){
		return "left, val=0";
	}else{
		return "right, val=!0";
	}
}
//set direction of bomb (int)
function setDirection(val: int){
	dir= val;
}
//get force to push bomb with
function getForce(){
	return force;
}
//set force to push bomb with
function setForce(sForce: int){
	force = sForce;
}
	
//get the number of bounces needed to kill bomb
function getBounceCounter(){
	return bounceCounter;
}
//set the number of bounces needed to kill bomb (must be int)
function setBounceCounter(hit: int){
	bounceCounter = hit;
}

//movement, bomb collision events
function OnCollisionEnter(bCollision : Collision){

	//bomb touches platforms
	if(bCollision.gameObject.tag == "Platform"){
		bounceCounter-=1;	//decrement bounce counter
		//print("BounceCounter: " + bounceCounter); //testing
		
		//call method to push the bomb
		PushBomb(dir);		
		//if bomb bounces on floor 2 or more times destroy
		if(bounceCounter <= 0){
			Destroy(gameObject, .01); //destroy after .1 second
		}
	}
	//bomb touches BombChute
	if(bCollision.gameObject.tag == "BombChute"){
		bounceCounter-=1;	//decrement bounce counter
		//print("BounceCounter: " + bounceCounter); //testing
		
		//call method to push the bomb
		PushBomb(dir);		
		//if bomb bounces on floor 2 or more times destroy
		if(bounceCounter <= 0){
			Destroy(gameObject, .01); //destroy after .1 second
		}
	}
	//explosive force on object (with rigid body) that the bomb touches
	if(bCollision.gameObject.rigidbody) {
		for(var contact in bCollision.contacts) {
				bCollision.gameObject.rigidbody.AddExplosionForce(power, contact.point, radius, upModifier);
		}
		Destroy(this.gameObject, .2); //destroy after .2 seconds
	}
	//bomb touches player
	if( bCollision.gameObject.tag == "Player" ) {
      Destroy(gameObject, .2); //destroy after .2 seconds
    }
    //destroy bomb if hit by bullet
    if( bCollision.gameObject.tag == "Bullet" ) {
      Destroy(gameObject,.1); //destroy after .1 seconds
    } 
}
//pushes bomb in a direction
function PushBomb(direction){
	//if direction =1 push left, else push right
	if(direction == 1){
		this.transform.rigidbody.AddForce(Vector3.left*force);
	}else{
		this.transform.rigidbody.AddForce(Vector3.right*force);
	}
}