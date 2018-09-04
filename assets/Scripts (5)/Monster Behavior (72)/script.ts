class MonsterBehavior extends Sup.Behavior {
    
    active:boolean = false
    
    monster_type:string = ''
    monster_health:number = 0
    
    monsters:any = {
        Fire:  [],
        Water: ['Alric Stormbringer', 'Sabre Shark', 'Crustacean King', 'Spineback Turtle', 'Pirate Captain', 'Medusa', 'Frozen Soldier', 'Naga Warrior', 'Water Elemental', 'Mischievous Mermaid', 'Frost Giant'],
        Earth: ['Rexxie', 'Lyanna Natura', 'Minotaur Warrior', 'Stone Golem', 'Goblin Sorcerer', 'Flesh Golem', 'Stonesplitter Orc', 'Earth Elemental', 'Swamp Thing', 'Magi Of The Forest', 'Spirit Of The Forest'],
        Life:  [],
        Death: ['Zintar Mortalis', 'Lord Of Darkness', 'Spineback Wolf', 'Skeleton Assassin', 'Haunted Spider', 'Animated Corpse', 'Undead Priest', 'Twisted Jester', 'Haunted Spirit', 'Screaming Banshee', 'Enchantress Of The Night']
    }
    
    fly_by_tween:Sup.Tween
    
    
    spawn( tile_type:string, x_pos:number, z_pos:number, player_facing:string ) {
        
        if( tile_type == 'lava' ) this.monster_type = 'Fire'
        else if( tile_type == 'water' ) this.monster_type = 'Water'
        else if( tile_type == 'swamp' ) this.monster_type = 'Earth'
        else if( tile_type == 'grass' ) this.monster_type = 'Life'
        else if( tile_type == 'dark pebbles' ) this.monster_type = 'Death'
        
        if( player_facing == 'NORTH' ) {
            this.actor.setLocalPosition(x_pos - 0.45, 0, z_pos - 0.45)
            this.actor.setLocalEulerY( 0 )
        }
        else if( player_facing == 'EAST' ) {
            this.actor.setLocalPosition(x_pos + 0.45, 0, z_pos - 0.45)
            this.actor.setLocalEulerY( Sup.Math.toRadians(-90) )
        }
        else if( player_facing == 'SOUTH' ) {
            this.actor.setLocalPosition(x_pos + 0.45, 0, z_pos + 0.45)
            this.actor.setLocalEulerY( Sup.Math.toRadians(180) )
        }
        else if( player_facing == 'WEST' ) {
            this.actor.setLocalPosition(x_pos - 0.45, 0, z_pos + 0.45)
            this.actor.setLocalEulerY( Sup.Math.toRadians(90) )
        }
        
        new Sup.SpriteRenderer(this.actor, `Images/Monsters/${this.monster_type}/Full`)
        let animation = Sup.Math.Random.sample( this.monsters[this.monster_type] )
        this.actor.spriteRenderer.setAnimation(animation.toString(), false)
        
        this.active = true
        
        this.fly_by( player_facing )
        
    }
    
    
    fly_by( dir ) {
        
        let self = this, position = { x: this.actor.getLocalX(), z: this.actor.getLocalZ(), r_z: Sup.Math.toRadians(20) }, fly_by_time = Sup.Math.Random.integer(345, 678)
        
        this.fly_by_tween = new Sup.Tween(this.actor, position)
        
        if( dir == 'NORTH' ) this.fly_by_tween.to({ x: position.x + 0.9, r_z: Sup.Math.toRadians(-20) }, fly_by_time)
        else if( dir == 'EAST'  ) this.fly_by_tween.to({ z: position.z + 0.9, r_z: Sup.Math.toRadians(-20) }, fly_by_time)
        else if( dir == 'SOUTH' ) this.fly_by_tween.to({ x: position.x - 0.9, r_z: Sup.Math.toRadians(-20) }, fly_by_time)
        else if( dir == 'WEST'  ) this.fly_by_tween.to({ z: position.z - 0.9, r_z: Sup.Math.toRadians(-20) }, fly_by_time)
        
        this.fly_by_tween.onUpdate(() => {
            self.actor.setLocalPosition(position.x, 0, position.z)
            self.actor.setLocalEulerZ( position.r_z )
        })
        
        this.fly_by_tween.onComplete(() => {
            self.hide()
        })
        
        this.fly_by_tween.start()
        
    }

    
    update() {
        
        if( this.active ) {
            
            if( Sup.getActor('Player').getBehavior(PlayerBehavior).state == 'MOVING' ) this.hide()
                
        }
    
    }
    
    
    hide() {
        if( this.fly_by_tween ) {
            this.fly_by_tween.stop()
            this.fly_by_tween = null
        }
        
        if( this.actor.spriteRenderer ) this.actor.spriteRenderer.destroy()
        
        this.actor.setLocalPosition(0, 0, 0)
        
        this.active = false
    }
    
}

Sup.registerBehavior(MonsterBehavior);