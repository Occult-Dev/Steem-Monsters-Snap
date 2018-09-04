class MainGameScriptBehavior extends Sup.Behavior {
    
    in_battle:boolean = false
    
    
    awake() {
    
        
    
    }

    
    update() {
    
        if( Sup.Input.wasKeyJustPressed('SPACE') ) Sup.loadScene('Scenes/Sandbox')
    
    }
    
    
    activate_battle() {
        
        Sup.getActor('Battle HUD').getBehavior(BattleBehavior).toggle_active(true)
        Sup.getActor('Player').getBehavior(PlayerBehavior).state = 'IN BATTLE - CHOOSING'
        
        this.in_battle = true
        
    }
    
    
    switch_turns() {
        
        let player = Sup.getActor('Player').getBehavior(PlayerBehavior), enemy = Sup.getActor('Enemy Monster').getBehavior(MonsterBehavior)
        
        // IS IT THE PLAYERS TURN?
        if( player.state == 'IN BATTLE - DEFENDING' ) {
            enemy.state = 'IN BATTLE - DEFENDING'
            player.state = 'IN BATTLE - CHOOSING'
        }
        // OR THE ENEMIES TURN?
        else if( enemy.state == 'IN BATTLE - DEFENDING' ) {
            player.state = 'IN BATTLE - DEFENDING'
            enemy.state = 'IN BATTLE - ATTACKING'
        }
        
    }
    
    
    deactivate_battle() {
        
        Sup.getActor('Battle HUD').getBehavior(BattleBehavior).toggle_active(false)
        Sup.getActor('Enemy Monster').getBehavior(MonsterBehavior).hide()
        Sup.getActor('Player').getBehavior(PlayerBehavior).leave_battle()
        
        this.in_battle = false
        
    }
    
}

Sup.registerBehavior(MainGameScriptBehavior);