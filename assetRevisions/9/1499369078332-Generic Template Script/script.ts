declare var SaveData
if( Sup.Storage.getJSON( 'Save Data' ) ) SaveData = Sup.Storage.getJSON( 'Save Data' )
else SaveData = {}

function GetMouseUnitPosition( camera?:Sup.Camera ):Sup.Math.Vector2 {
    
    camera = camera || Sup.getActor('Camera').camera
    
    let position = Sup.Input.getMousePosition().multiplyScalar( camera.getOrthographicScale()*0.5 )
    position.x *= camera.getWidthToHeightRatio()
    
    return( position.add( camera.actor.getPosition() ) )
    
}

function GetTouchUnitPosition( index:number, camera?:Sup.Camera ):Sup.Math.Vector2 {
    
    camera = camera || Sup.getActor('Camera').camera
    
    let position = Sup.Input.getTouchPosition(index).multiplyScalar( camera.getOrthographicScale()*0.5 )
    position.x *= camera.getWidthToHeightRatio()
    
    return( position.add( camera.actor.getPosition() ) )
    
}