#pragma strict


function OnCollisionEnter(collision : Collision) {

	if( collision.gameObject.tag == "Bullet" ) {
		
		Debug.Log("Rotating Pipe!!!");
		
		// send messages to all children pipes to rotate
		transform.BroadcastMessage("RotatePipe",SendMessageOptions.RequireReceiver);
		 
		
		
	}

}