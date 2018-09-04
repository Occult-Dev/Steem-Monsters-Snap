declare var window, save_data, latest_version

latest_version = 1.0

if( Sup.Storage.getJSON( 'Save Data' ) && Sup.Storage.getJSON( 'Save Data' ).version == latest_version ) save_data = Sup.Storage.getJSON( 'Save Data' )
else save_data = {
    version: latest_version,
    
    captured_monsters: {
        Fire:  [],
        Water: [],
        Earth: [],
        Life:  [],
        Death: []
    },
    
    pictures_taken: { of_monsters: 0, total: 0 }
}

Sup.Input.on('exit', () => {
    Sup.log('saving...')
    Sup.Storage.setJSON('Save Data', save_data)
})

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