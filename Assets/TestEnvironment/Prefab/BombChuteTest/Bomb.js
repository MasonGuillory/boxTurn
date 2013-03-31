#pragma strict

var hitCounter : int = 3;	//keeps record of number of hits
var force : int = 55;		//force to push bomb with
var dir : int = 0;			//direction to move bomb in (1=left, else right)
var power : float = 100.0;
var radius : float= 2.0;
var upModifier : float = 0.0;

function Start () {
	//Do nothing
}

function Update () {
	//Do nothing
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
function setForce(sForce){
	force = sForce;
}
	
//get the number of hits needed to kill bomb
function getHitCounter(){
	return hitCounter;
}
//set the number of hits needed to kill bomb (must be int)
function setHitCounter(hit){
	hitCounter = hit;
}

//movement, bomb collision events
function OnCollisionEnter(bCollision : Collision){

	//bomb touches platforms
	if(bCollision.gameObject.tag == "Platform"){
		print("Collision with Floor"); //testing
		hitCounter-=1;	//decrement hit counter
		//print("HitCounter: " + hitCounter); //testing
		
		//call method to push the bomb
		PushBomb(dir);		
		//if bomb hits floor 2 or more times destroy
		if(hitCounter <= 0){
			Destroy(gameObject, .01); //destroy after .1 second
		}
	}
	//bomb touches player
	if( bCollision.gameObject.tag == "Player" ) {
		/* INSERT EXPLOSION WITH RADIUS HERE*/
      Destroy(gameObject, .2); //destroy after .2 seconds
    }
    //destroy bomb if hit by bullet
    if( bCollision.gameObject.tag == "Bullet" ) {
      Destroy(gameObject,.1); //destroy after .1 seconds
    } 
}
//pushes bomb in a direction
function PushBomb(direction){
	print("pushBomb");
	//if direction =1 push left, else push right
	if(direction == 1){
		this.transform.rigidbody.AddForce(Vector3.left*force);
	}else{
		this.transform.rigidbody.AddForce(Vector3.right*force);
	}
}