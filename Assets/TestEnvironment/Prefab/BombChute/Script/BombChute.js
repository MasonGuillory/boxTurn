#pragma strict

/*	BombChute v3-0 (BombChute Script)
*	By: Felix Sotres (3/24/13)
*
*	Info:
*		-This is the basic BombChute script
*
*	Functionality Overview:
*		-BombChute will deploy a bomb below itself at a constant rate
*		-BombChute will NOT deploy if it is facing in any other way other than world down
*
*	Setup:
*		-Please tag all platforms as "Platform"
*		-Please tag all bombChutes as "BombChute"
*/

//prefab objects
var bombChute : Transform;		//used to get transform position
var bomb: Transform;			//used to deploy bomb
//used to hold position vectors
private var deployPosition: Vector3;
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

function Start () {
	
	//get vector position of bombchute
	bombChutePosition = bombChute.position;
	//this will be the deployment transform for the bomb (.2 units underneath its center)
	deployPosition = Vector3(bombChute.position.x, bombChute.position.y-.2,bombChute.position.z);
	//get time at beginning of game [TESTING CAN COMMENT OUT BUT PLEASE COMMENT GUI TIMER OUT TOO]
	timerStart = Time.time;
	//start deployment of bombs right away
	InvokeRepeating("LaunchBomb", startDeploy, deployDelay);
	
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

//this is a reoccurring function for lauching bombs
function LaunchBomb(){
	//get current euler angles of bomb chute
	eux= bombChute.eulerAngles.x;
	euy= bombChute.eulerAngles.y;
	euz= bombChute.eulerAngles.z;
	//get vector position of bombchute
	bombChutePosition = bombChute.position;
	//this will be the deployment transform for the bomb (.2 units underneath its center)
	deployPosition = Vector3(bombChute.position.x, bombChute.position.y-.2,bombChute.position.z);
	//if bomb chute's bottom is facing the game world down position deploy
	if(euz <=0){
		//deploy bomb prefab under center of bombchute
		Instantiate(bomb, deployPosition , Quaternion.identity);
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