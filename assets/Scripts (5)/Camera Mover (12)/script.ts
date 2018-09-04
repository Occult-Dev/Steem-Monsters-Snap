class CameraMover extends Sup.Behavior {
  
  camera_speed:number = 0.1
  camera_speed_multiplier:number = 5
  
  round_number( number ) {
    return Math.round( ( number + 0.00001 ) * 1000 ) / 1000
  }

  
  update() {

    let camera_movement_speed:number = 0

    if( Sup.Input.isKeyDown( 'SHIFT' ) ) camera_movement_speed = this.camera_speed * this.camera_speed_multiplier
    else camera_movement_speed = this.camera_speed
    
    if( Sup.Input.isKeyDown( 'A' ) ) {
      if( Sup.Input.isKeyDown( 'F' ) ) this.actor.getChild( 'Camera' ).rotateLocalEulerX(Sup.Math.toRadians( camera_movement_speed ) )
      else if( Sup.Input.isKeyDown( 'S' ) ) this.actor.getChild( 'Camera' ).rotateLocalEulerX( Sup.Math.toRadians( -camera_movement_speed ) )
      
      else if( Sup.Input.isKeyDown( 'R' ) ) this.actor.rotateEulerY(Sup.Math.toRadians( camera_movement_speed ) )
      else if( Sup.Input.isKeyDown( 'T' ) ) this.actor.rotateEulerY(Sup.Math.toRadians( -camera_movement_speed ) )
      
      else if( Sup.Input.isKeyDown( 'P' ) ) this.actor.getChild( 'Camera' ).rotateLocalEulerZ( Sup.Math.toRadians( -camera_movement_speed ) )
      else if( Sup.Input.isKeyDown( 'W' ) ) this.actor.getChild( 'Camera' ).rotateLocalEulerZ( Sup.Math.toRadians( camera_movement_speed ) )
      else if( Sup.Input.isKeyDown( 'G' ) ) {
        this.actor.getChild( 'Camera' ).setEulerZ(0)
        this.actor.getChild( 'Camera' ).setLocalEulerZ(0)
      }
    }
    else {
      if( Sup.Input.isKeyDown( 'F' ) ) this.actor.moveOrientedZ( -camera_movement_speed )
      if( Sup.Input.isKeyDown( 'S' ) ) this.actor.moveOrientedZ( camera_movement_speed )
      
      if( Sup.Input.isKeyDown( 'R' ) ) this.actor.moveOrientedX( -camera_movement_speed )
      if( Sup.Input.isKeyDown( 'T' ) ) this.actor.moveOrientedX( camera_movement_speed )
      
      if( Sup.Input.isKeyDown( 'SPACE' ) ) this.actor.moveY( camera_movement_speed )
      if( Sup.Input.isKeyDown( 'CONTROL' ) ) this.actor.moveY( -camera_movement_speed )
    }
    
    if( Sup.Input.wasKeyJustPressed( 'RETURN' ) ) {
      let r_x = Sup.Math.toDegrees( this.actor.getChild( 'Camera' ).getEulerX() )
      let r_y = Sup.Math.toDegrees( this.actor.getChild( 'Camera' ).getEulerY() )
      let r_z = Sup.Math.toDegrees( this.actor.getChild( 'Camera' ).getEulerZ() )
      
      Sup.log( 'CAMERA-PARENT POSITION:\nX: ' + this.round_number( this.actor.getX() ), '\nY: ' + this.round_number( this.actor.getY() ), '\nZ: ' + this.round_number( this.actor.getZ() ), '\nrY: ' + this.round_number( r_y ), '\n\nCAMERA ANGLES:\nrX: ' + this.round_number( r_x ), '\nrZ: ' + this.round_number( r_z ) )
    }
  
  }
  
}

Sup.registerBehavior(CameraMover);