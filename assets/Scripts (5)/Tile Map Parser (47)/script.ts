class TileMapParserBehavior extends Sup.Behavior {
    
    tilemap:Sup.TileMap
    tileset:Sup.TileSet
    
    
    awake() {
    
        this.tilemap = this.actor.tileMapRenderer.getTileMap(), this.tileset = this.actor.tileMapRenderer.getTileSet()
        
        for( let y = 0; y < this.tilemap.getHeight(); y++ ) {
            for( let x = 0; x< this.tilemap.getWidth(); x++ ) {
                let type_of_tile = this.tileset.getTileProperties( this.tilemap.getTileAt(0, x, y) )['tile type']
                
                if( type_of_tile == 'gray pebbles' || type_of_tile == 'dark stone' || type_of_tile == 'mossy stone' ) this.spawn_tile( type_of_tile, x, y )
            }
        }
    
    }

    
    spawn_tile( tile_type, x, z ) {
    
        let tile_actor = new Sup.Actor( `${tile_type} X: ${x} Z: ${z}`, Sup.getActor('Walls') )
        
        let tile
        if( tile_type == 'gray pebbles' ) tile = 'Gray Pebble Wall'
        else if( tile_type == 'dark stone' ) tile = 'Dark Stone Wall'
        else if( tile_type == 'mossy stone' ) tile = 'Mossy Stone Wall'
        
        new Sup.ModelRenderer( tile_actor, `Models/${tile}` )
        
        tile_actor.setPosition(x + 0.5, 0, -(z + 0.5))
    
    }
    
}

Sup.registerBehavior(TileMapParserBehavior);