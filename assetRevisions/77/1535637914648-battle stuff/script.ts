class PlayerBehavior extends Sup.Behavior {
    
    state:string = 'MOVABLE'
    
    facing:string = 'NORTH'
    moving_into_tile:string = ''
    
    monster_stats:any = {
        health: 10,
        max_hp: 10,
        attack: 1,
        defense: 1,
        level: 1
    }
    
    
    awake() {
    
        // arm-up: x: 0.115 y: -0.115
        // arm-down: x: 0.16 y: -0.175
    
    }

    
    update() {
        
        if( this.state == 'MOVABLE' ) {
            
            if( Sup.Input.isKeyDown('F') ) {
                if( this.is_movement_legal('FORWARD') ) this.legal_move_tween( 'FORWARD' )
                else this.illegal_move_tween( 'FORWARD' )
            }
            else if( Sup.Input.isKeyDown('S') ) {
                if( this.is_movement_legal('BACKWARD') ) this.legal_move_tween( 'BACKWARD' )
                else this.illegal_move_tween( 'BACKWARD' )
            }
            else if( Sup.Input.isKeyDown('R') ) {
                if( this.facing == 'NORTH' ) this.facing = 'WEST'
                else if( this.facing == 'WEST' ) this.facing = 'SOUTH'
                else if( this.facing == 'SOUTH' ) this.facing = 'EAST'
                else if( this.facing == 'EAST' ) this.facing = 'NORTH'
                
                this.legal_move_tween( 'TURN LEFT' )
            }
            else if( Sup.Input.isKeyDown('T') ) {
                if( this.facing == 'NORTH' ) this.facing = 'EAST'
                else if( this.facing == 'EAST' ) this.facing = 'SOUTH'
                else if( this.facing == 'SOUTH' ) this.facing = 'WEST'
                else if( this.facing == 'WEST' ) this.facing = 'NORTH'
                
                this.legal_move_tween( 'TURN RIGHT' )
            }
            
        }
        else if( this.state == 'IN BATTLE - CHOOSING' ) {
            
            let arm = this.actor.getChild('Arm')
            
            arm.setLocalPosition( (Sup.Input.getMousePosition().x / 7) + 0.125, (Sup.Input.getMousePosition().y / 7) - 0.15, -0.105 )
            
            if( arm.getLocalX() > 0.225 ) arm.setLocalX(0.225)
            else if( arm.getLocalX() < 0.11 ) arm.setLocalX(0.11)
            
            if( arm.getLocalY() > -0.11 ) arm.setLocalY(-0.11)
            else if( arm.getLocalY() < -0.27 ) arm.setLocalY(-0.27)
            
        }
    
    }
    
    
    attack() {
        
        Sup.getActor('Game World').getBehavior(MainGameScriptBehavior).switch_turns()
    }
    
    
    defend() {
        
        if( this.monster_stats.health < this.monster_stats.max_hp ) this.monster_stats.health++
        
        Sup.getActor('Game World').getBehavior(MainGameScriptBehavior).switch_turns()
    }
    
    
    leave_battle() {
        
        this.actor.getChild('Arm').setLocalPosition(0.16, -0.175, -0.105)
        
        this.state = 'MOVABLE'
        
    }
    
    
    is_movement_legal( dir ) {
        
        let actor_tile_position = { x: Math.floor(this.actor.getLocalX()), z: Math.abs(Math.floor(this.actor.getLocalZ())) }
        
        let level = Sup.getActor('Level').getBehavior(TileMapParserBehavior)
        let tilemap = level.tilemap, tileset = level.tileset
        
        let moving_into_tile, into_x = actor_tile_position.x, into_y = actor_tile_position.z - 1
        if( dir == 'FORWARD' ) {
            if( this.facing == 'NORTH' ) into_y++
            else if( this.facing == 'EAST' ) into_x++
            else if( this.facing == 'SOUTH' ) into_y--
            else if( this.facing == 'WEST' ) into_x--
        }
        else if( dir == 'BACKWARD' ) {
            if( this.facing == 'NORTH' ) into_y--
            else if( this.facing == 'EAST' ) into_x--
            else if( this.facing == 'SOUTH' ) into_y++
            else if( this.facing == 'WEST' ) into_x++
        }
        
        this.moving_into_tile = tileset.getTileProperties( tilemap.getTileAt(0, into_x, into_y) )['type']
        
        Sup.log( actor_tile_position.x, actor_tile_position.z, this.facing, into_x, into_y, this.moving_into_tile )
        
        if( this.moving_into_tile == 'grass' || this.moving_into_tile == 'dark pebbles' ) return true
        else return false
        
    }
    
    
    legal_move_tween( dir ) {
    
        let self = this, actor_props = { x: this.actor.getX(), z: this.actor.getZ(), movement: 0, rotate: this.actor.getEulerY() }
        
        let movement_tween = new Sup.Tween( this.actor, actor_props )
        
        if( dir == 'FORWARD' ) movement_tween.to( { movement: 1 }, 222 )
        else if( dir == 'BACKWARD' ) movement_tween.to( { movement: -1 }, 222 )
        else if( dir == 'TURN LEFT' ) movement_tween.to( { rotate: actor_props.rotate + Sup.Math.toRadians(90) }, 250 )
        else if( dir == 'TURN RIGHT' ) movement_tween.to( { rotate: actor_props.rotate + Sup.Math.toRadians(-90) }, 250 )
        
        movement_tween.onUpdate( () => {
            if( dir == 'FORWARD' || dir == 'BACKWARD' ) {
                if( self.facing == 'NORTH' ) self.actor.setLocalZ( actor_props.z - actor_props.movement )
                else if( self.facing == 'EAST' ) self.actor.setLocalX( actor_props.x + actor_props.movement )
                else if( self.facing == 'SOUTH' ) self.actor.setLocalZ( actor_props.z + actor_props.movement )
                else if( self.facing == 'WEST' ) self.actor.setLocalX( actor_props.x - actor_props.movement )
            }
            else if( dir == 'TURN LEFT' || dir == 'TURN RIGHT' ) self.actor.setEulerY( actor_props.rotate )
        } )
        
        if( dir == 'FORWARD' || dir == 'BACKWARD' ) movement_tween.easing(TWEEN.Easing.Quadratic.InOut)
        else if( dir == 'TURN LEFT' || dir == 'TURN RIGHT' ) movement_tween.easing(TWEEN.Easing.Quadratic.Out)
        
        movement_tween.onComplete( () => {
            // if( (dir == 'FORWARD' || dir == 'BACKWARD') && Sup.Math.Random.integer(0, 4) == 4 ) {
            //     Sup.getActor('Enemy Monster').getBehavior(MonsterBehavior).spawn( self.moving_into_tile, self.actor.getLocalX(), self.actor.getLocalZ(), self.facing )
            //     self.state = 'IN BATTLE - CHOOSING'
            // }
            // else self.state = 'MOVABLE'
            Sup.getActor('Enemy Monster').getBehavior(MonsterBehavior).spawn( self.moving_into_tile, self.actor.getLocalX(), self.actor.getLocalZ(), self.facing )
            self.state = 'IN BATTLE - CHOOSING'
        } )
        
        movement_tween.start()
        
        this.state = 'MOVING'
    
    }
    
    
    illegal_move_tween( dir ) {
        
        let self = this, actor_props = { x: this.actor.getX(), z: this.actor.getZ(), movement: 0 }
        
        let movement_tween = new Sup.Tween( this.actor, actor_props )
        
        if( dir == 'FORWARD' ) movement_tween.to( { movement: 0.14 }, 150 )
        else if( dir == 'BACKWARD' ) movement_tween.to( { movement: -0.14 }, 150 )
        
        movement_tween.onUpdate( () => {
            if( self.facing == 'NORTH' ) self.actor.setLocalZ( actor_props.z - actor_props.movement )
            else if( self.facing == 'EAST' ) self.actor.setLocalX( actor_props.x + actor_props.movement )
            else if( self.facing == 'SOUTH' ) self.actor.setLocalZ( actor_props.z + actor_props.movement )
            else if( self.facing == 'WEST' ) self.actor.setLocalX( actor_props.x - actor_props.movement )
        } )
        
        movement_tween.easing(TWEEN.Easing.Quadratic.InOut)
        
        movement_tween.onComplete( () => { self.state = 'MOVABLE' } )
        
        movement_tween.yoyo(true)
        movement_tween.repeat(1)
        
        movement_tween.start()
        
        this.state = 'MOVING'
        
    }
    
}

Sup.registerBehavior(PlayerBehavior);