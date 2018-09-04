class MonsterBehavior extends Sup.Behavior {
    
    monster_type:string = ''
    monster_health:number = 0
    
    state:string = 'VOID'
    
    monsters:Object = {
        fire:  [],
        water: [],
        earth: [],
        life:  [],
        death: ['Animated Corpse', 'Haunted Spider', 'Skeleton Assassin', 'Spineback Wolf']
    }
    
    
    spawn( tile_type:string, x_pos:number, z_pos:number, player_facing:string ) {
        Sup.log(`SPAWNING ${tile_type} MONSTER`)
        
        if( player_facing == 'NORTH' ) {
            this.actor.setLocalPosition(x_pos, 0, z_pos - 0.45)
            this.actor.setLocalEulerY( 0 )
        }
        else if( player_facing == 'EAST' ) {
            this.actor.setLocalPosition(x_pos + 0.45, 0, z_pos)
            this.actor.setLocalEulerY( Sup.Math.toRadians(-90) )
        }
        else if( player_facing == 'SOUTH' ) {
            this.actor.setLocalPosition(x_pos, 0, z_pos + 0.45)
            this.actor.setLocalEulerY( Sup.Math.toRadians(180) )
        }
        else if( player_facing == 'WEST' ) {
            this.actor.setLocalPosition(x_pos - 0.45, 0, z_pos)
            this.actor.setLocalEulerY( Sup.Math.toRadians(90) )
        }
        
        new Sup.SpriteRenderer(this.actor, `Images/Monsters/Death/${Sup.Math.Random.sample( this.monsters['death'] )}`)
        
        Sup.getActor('Game World').getBehavior(MainGameScriptBehavior).activate_battle()
        
        this.monster_health = 100
        
        this.state = 'IN BATTLE - DEFENDING'
    }

    
    update() {
        
        if( this.state == 'IN BATTLE - DEFENDING' ) {
            
        }
        else if( this.state == 'IN BATTLE - ATTACKING' ) {
            
        }
    
    }
    
    
    hide() {
        this.actor.spriteRenderer.destroy()
        
        this.actor.setLocalPosition(0, 0, 0)
        
        this.state = 'VOID'
    }
    
}

Sup.registerBehavior(MonsterBehavior);