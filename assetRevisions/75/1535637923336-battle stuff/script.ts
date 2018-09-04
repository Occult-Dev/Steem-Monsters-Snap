class BattleBehavior extends Sup.Behavior {
    
    active:boolean = false
    
    attack_option:Sup.Actor
    defend_option:Sup.Actor
    run_option:Sup.Actor
    
    mouse_over_option:Sup.Actor = null
    
    
    awake() {
        
        this.attack_option = this.actor.getChild('Attack Option')
        this.defend_option = this.actor.getChild('Defend Option')
        this.run_option = this.actor.getChild('Run Option')
        
    }
    
    
    toggle_active( set_to ) {
        
        if( set_to ) {
            this.active = true
            this.actor.setVisible(true)
        }
        else if( !set_to ) {
            this.active = false
            this.actor.setVisible(false)
            this.reset_HUD()
        }
        
    }

    
    update() {
        
        if( !this.active ) return;
        else {
            
            if( Sup.getActor('Player').getBehavior(PlayerBehavior).state != 'IN BATTLE - CHOOSING' ) return;
            else {
                
                if( this.attack_option.getChild('Background').fMouseInput.isMouseOver ) {
                    if( this.mouse_over_option != null && this.mouse_over_option != this.attack_option ) {
                        this.mouse_over_option.getChild('Background').setLocalScaleX(6.5)
                        this.mouse_over_option.getChild('Text').setLocalX(2.5)
                        this.mouse_over_option.getChild('Text').textRenderer.setColor( new Sup.Color(0xbbbbbb) )
                    }
                    else if( this.mouse_over_option != this.attack_option ) {
                        this.mouse_over_option = this.attack_option

                        this.attack_option.getChild('Background').setLocalScaleX(7)
                        this.attack_option.getChild('Text').setLocalX(4)
                        this.attack_option.getChild('Text').textRenderer.setColor( new Sup.Color(0x000000) )
                    }
                }
                else if( this.defend_option.getChild('Background').fMouseInput.isMouseOver ) {
                    if( this.mouse_over_option != null && this.mouse_over_option != this.defend_option ) {
                        this.mouse_over_option.getChild('Background').setLocalScaleX(6.5)
                        this.mouse_over_option.getChild('Text').setLocalX(2.5)
                        this.mouse_over_option.getChild('Text').textRenderer.setColor( new Sup.Color(0xbbbbbb) )
                    }
                    else if( this.mouse_over_option != this.defend_option ) {
                        this.mouse_over_option = this.defend_option

                        this.defend_option.getChild('Background').setLocalScaleX(7)
                        this.defend_option.getChild('Text').setLocalX(4)
                        this.defend_option.getChild('Text').textRenderer.setColor( new Sup.Color(0x000000) )
                    }
                }
                else if( this.run_option.getChild('Background').fMouseInput.isMouseOver ) {
                    if( this.mouse_over_option != null && this.mouse_over_option != this.run_option ) {
                        this.mouse_over_option.getChild('Background').setLocalScaleX(6.5)
                        this.mouse_over_option.getChild('Text').setLocalX(2.5)
                        this.mouse_over_option.getChild('Text').textRenderer.setColor( new Sup.Color(0xbbbbbb) )
                    }
                    else if( this.mouse_over_option != this.run_option ) {
                        this.mouse_over_option = this.run_option

                        this.run_option.getChild('Background').setLocalScaleX(7)
                        this.run_option.getChild('Text').setLocalX(4)
                        this.run_option.getChild('Text').textRenderer.setColor( new Sup.Color(0x000000) )
                    }
                }
                else if( this.mouse_over_option != null ) {
                    this.mouse_over_option.getChild('Background').setLocalScaleX(6.5)
                    this.mouse_over_option.getChild('Text').setLocalX(2.5)
                    this.mouse_over_option.getChild('Text').textRenderer.setColor( new Sup.Color(0xbbbbbb) )
                    this.mouse_over_option = null
                }


                if( Sup.Input.wasMouseButtonJustPressed(0) && this.mouse_over_option != null ) {
                    if( this.mouse_over_option == this.attack_option ) {
                        Sup.getActor('Player').getBehavior(PlayerBehavior).attack()
                        this.reset_HUD()
                    }
                    else if( this.mouse_over_option == this.defend_option ) {
                        Sup.getActor('Player').getBehavior(PlayerBehavior).defend()
                        this.reset_HUD()
                    }
                    else if( this.mouse_over_option == this.run_option ) {

                        let run_success = Sup.Math.Random.integer(0, 1)

                        if( run_success ) Sup.getActor('Game World').getBehavior(MainGameScriptBehavior).deactivate_battle()
                        else if( !run_success ) {
                            Sup.log('Run Failed')
                            this.reset_HUD()
                            Sup.getActor('Game World').getBehavior(MainGameScriptBehavior).switch_turns()
                        }

                    }
                }
                
            }
            
        }
    
    }
    
    
    reset_HUD() {
        if( this.mouse_over_option != null ) {
            this.mouse_over_option.getChild('Background').setLocalScaleX(6.5)
            this.mouse_over_option.getChild('Text').setLocalX(2.5)
            this.mouse_over_option.getChild('Text').textRenderer.setColor( new Sup.Color(0xbbbbbb) )
            this.mouse_over_option = null
        }
    }
    
}

Sup.registerBehavior(BattleBehavior);