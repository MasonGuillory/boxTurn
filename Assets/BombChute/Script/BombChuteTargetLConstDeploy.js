#pragma strict
/* 	BombChuteTargetLConstDeploy v3-0
*	By: Felix Sotres (3/24/13)
*
*	Info:
*		-This is based off the basic BombChute script
*
*	Functionality Overview:
*		-BombChute will deploy a bomb below itself at a constant rate
*		-Bomb will initially bounce left
*		-BombChute WILL deploy if it is facing in any other way other than world down
*		-If BombChute is shot by Player (collision with projectile object) it will deploy bombs
*			that bounce in the opposite direction than they originally bounced in
*
*	Setup:
*		-Please tag all platforms as "Platform"
*		-Please tag all bombChutes as "BombChute"
*/

//prefab objects
var bombChute : Transform;		//used to get transform position
var bombRight: Transform;		//used to deploy bomb traveling right
var bombLeft: Transform;		//used to deploy bomb traveling left 
//used to hold position vectors
private var deployPositionYDown: Vector3;
private var bombChutePosition: Vector3;
//repeat bomb deployment
var startDeploy : float=3.0;	//first bomb deployment (in sec)
var deployDelay : float=4.0;	//reoccurring bomb deployment (in sec)
//timer
private var timerStart : float;	//holds time at beginning of game
var textTime: String;			//holds time for printing on gui
//euler angles
var eux: float = 0.0;			//stores x
var euy: float = 0.0;			//stores y
var euz: float = 0.0;			//stores z
//bolean for directional deployment
var right: boolean = false;		//true=deploy right, false=deploy left

function Start () {
	
	//get vector position of bombchute
	bombChutePosition = bombChute.position;
	//this will be the deployment transform for the bomb (.2 units underneath its center)
	deployPositionYDown = Vector3(bombChute.position.x, bombChute.position.y-.2,bombChute.position.z);
	//get time at beginning of game [TESTING CAN COMMENT OUT BUT PLEASE COMMENT GUI TIMER OUT TOO]
	timerStart = Time.time;
	//start deployment of bombs right away
	InvokeRepeating("LaunchBomb", startDeploy, deployDelay);
}
//returns boolean to determine bomb deployment direction
function getDeployDir(){
	return right;
}
//sets boolean value to determine bomb deployment direction
function setDeployDir(val: boolean){
	right= val;
}
function getStartDeployment(){
	return  startDeploy;
}
function getDeployDelay(){
	return deployDelay;
}
//set the amount of seconds before first bomb deployment (start must be a float)
function setStartDeployment(start: float){
	startDeploy = start;
}
//(delay must be a float)
function setDeployDelay(delay: float){
	deployDelay = delay;
}

function Update () {
	//do nothing
}
//if bombchute gets hit by projectile change direction of bomb deployed
function OnCollisionEnter(cCollision : Collision){
	if( cCollision.gameObject.tag == "Bullet" ){
      var current: boolean = getDeployDir();
      if(current == true){
      	setDeployDir(false);
      }
      if(current == false){
      	setDeployDir(true);
      }
    }
}

//this is a reoccurring function for lauching bombs
function LaunchBomb(){
	//get current euler angles of bomb chute
	eux= bombChute.eulerAngles.x;
	euy= bombChute.eulerAngles.y;
	euz= bombChute.eulerAngles.z;
	//get vector position of bombchute
	bombChutePosition = bombChute.position;
	//this will be the deployment transform (relative to BombChute transform) for the bomb (.2 units off its center)
	deployPositionYDown = Vector3(bombChute.position.x, bombChute.position.y-.2,bombChute.position.z);
	
	var rightP: boolean = getDeployDir();
	
	/*
	//if bomb chute's bottom is facing the game world down position deploy
	if(euz <=0  && rightP == true){
		//deploy bomb prefab under center of bombchute
		Instantiate(bombRight, deployPositionYDown , Quaternion.identity);
	}
	//deploy bomb euz<=0 (world down)
	if(euz <=0 && rightP == false){
		//deploy bomb prefab under center of bombchute
		Instantiate(bombLeft, deployPositionYDown , Quaternion.identity);
	}
	//deploy bomb rotated 90 deg (from starting position) counter-clockwise
	if(euz >=89 && euz <=91 && rightP == false){
		//deploy bomb prefab under center of bombchute
		Instantiate(bombLeft, deployPositionYDown , Quaternion.identity);
	}
	if(euz >=89 && euz <=91 && rightP == true){
		//deploy bomb prefab under center of bombchute
		Instantiate(bombRight, deployPositionYDown , Quaternion.identity);
	}
	//deploy bomb rotated 180 deg (from starting position) counter-clockwise
	if(euz >=179 && euz <=181 && rightP == false){
		//deploy bomb prefab under center of bombchute
		Instantiate(bombLeft, deployPositionYDown , Quaternion.identity);
	}
	if(euz >=179 && euz <=181 && rightP == true){
		//deploy bomb prefab under center of bombchute
		Instantiate(bombRight, deployPositionYDown , Quaternion.identity);
	}
	//deploy bomb rotated 270 deg (from starting position) counter-clockwise
	if(euz >=269 && euz <=271 && rightP == false){
		//deploy bomb prefab under center of bombchute
		Instantiate(bombLeft, deployPositionYDown , Quaternion.identity);
	}
	if(euz >=269 && euz <=271 && rightP == true){
		//deploy bomb prefab under center of bombchute
		Instantiate(bombRight, deployPositionYDown , Quaternion.identity);
	}

	*/	
	if (rightP) {
		if (euz <= 1 && euz >= -1) {
			//deploy bomb prefab under center of bombchute
			Instantiate(bombRight, deployPositionYDown , Quaternion.identity);
		} else if (euz >= 89 && euz <= 91) {
			//deploy bomb prefab under center of bombchute
			Instantiate(bombRight, deployPositionYDown , Quaternion.identity);
		} else if (euz >= 179 && euz <= 181) {
			//deploy bomb prefab under center of bombchute
			Instantiate(bombRight, deployPositionYDown , Quaternion.identity);
		} else if (euz >= 269 && euz <= 271) {
			//deploy bomb prefab under center of bombchute
			Instantiate(bombRight, deployPositionYDown , Quaternion.identity);
		}
	} else {
		if (euz <= 1 && euz >= -1) {
			//deploy bomb prefab under center of bombchute
			Instantiate(bombLeft, deployPositionYDown , Quaternion.identity);
		} else if (euz >= 89 && euz <= 91) {
			//deploy bomb prefab under center of bombchute
			Instantiate(bombLeft, deployPositionYDown , Quaternion.identity);
		} else if (euz >= 179 && euz <= 181) {
			//deploy bomb prefab under center of bombchute
			Instantiate(bombLeft, deployPositionYDown , Quaternion.identity);
		} else if (euz >= 269 && euz <= 271) {
			//deploy bomb prefab under center of bombchute
			Instantiate(bombLeft, deployPositionYDown , Quaternion.identity);
		}	
	}
}

//prints current euler angles of bombchute to the console
function Eulers(){
	//get euler angles
	eux= bombChute.eulerAngles.x;
	euy= bombChute.eulerAngles.y;
	euz= bombChute.eulerAngles.z;
	print("Euler Angles of Bomb Chute:\n"+
		"x: " + eux + " y: " + euy + " z: " + euz);
}