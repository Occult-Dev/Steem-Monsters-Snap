class MainGameScriptBehavior extends Sup.Behavior {
    
    in_album:boolean = false
    
    bg_music
    
    
    awake() {
    
        Sup.Input.setMouseVisible(false)
        
        this.bg_music = new Sup.Audio.SoundPlayer('Audio/Background Music', 0.6, { loop: true })
        this.bg_music.play()
    
    }

    
    update() {
    
        if( Sup.Input.wasKeyJustPressed('ESCAPE') ) {
            this.bg_music.stop()
            Sup.loadScene('Scenes/Main Game')
        }
        
        if( Sup.Input.wasMouseButtonJustPressed(0) && !this.in_album ) this.take_picture()
        else if( Sup.Input.wasMouseButtonJustPressed(2) && Sup.getActor('Player').getBehavior(PlayerBehavior).state != 'TAKING PICTURE' ) {
            if( !this.in_album ) {
                let camera_roll = Sup.appendScene('Scenes/Prefabs/Monster Album')[0]
                Sup.getActor('Player').getBehavior(PlayerBehavior).state = 'IN ALBUM'
                this.in_album = true
                Sup.Input.setMouseVisible(true)
            }
            else if( this.in_album ) {
                Sup.getActor('Player').getBehavior(PlayerBehavior).state = 'MOVABLE'
                this.in_album = false
                Sup.Input.setMouseVisible(false)
            }
        }
    
    }
    
    
    take_picture() {
        
        save_data.pictures_taken.total++
        
        
        let monster = Sup.getActor('Monster').getBehavior(MonsterBehavior), visible_monster = monster.active
        
        if( visible_monster ) {
            monster.fly_by_tween.stop()
            
            let player = Sup.getActor('Player').getBehavior(PlayerBehavior), player_x = player.actor.getLocalX(), player_z = player.actor.getLocalZ(), shot_quality = 'good'
            let monster_x = monster.actor.getLocalX(), monster_z = monster.actor.getLocalZ()
            
            
            if( player.facing == 'NORTH' && (monster_x < player_x - 0.275 || monster_x > player_x + 0.275) ) shot_quality = 'bad'
            else if( player.facing == 'EAST'  && (monster_z < player_z - 0.275 || monster_z > player_z + 0.275) ) shot_quality = 'bad'
            else if( player.facing == 'SOUTH' && (monster_x < player_x - 0.275 || monster_x > player_x + 0.275) ) shot_quality = 'bad'
            else if( player.facing == 'WEST'  && (monster_z < player_z - 0.275 || monster_z > player_z + 0.275) ) shot_quality = 'bad'
            
            let actual_monster = monster.actor.spriteRenderer.getAnimation(), message = ''
            
            if( shot_quality == 'good' ) {
                if( save_data.captured_monsters[monster.monster_type].indexOf( actual_monster ) < 0 ) {
                    save_data.captured_monsters[monster.monster_type].push( actual_monster )

                    Sup.getActor('Event Text').textRenderer.setColor( new Sup.Color(0x2ef173) )
                    message = `snapped a:\n"${actual_monster}"`
                }
                else {
                    Sup.getActor('Event Text').textRenderer.setColor( new Sup.Color(0xffffff) )
                    message = `snapped a:\n"${actual_monster}"\n...again`
                }
                
                save_data.pictures_taken.of_monsters++
            }
            else if( shot_quality == 'bad' ) {
                Sup.getActor('Event Text').textRenderer.setColor( new Sup.Color(0xf6504a) )
                message = `BAD SHOT!`
            }
            
            Sup.getActor('Event Text').textRenderer.setText(message)
            Sup.getActor('Event Text').getChildren().forEach((child_text) => {
                child_text.textRenderer.setText(message)
            } )
            this.float_text()
            
            Sup.log(`Snapped A ${actual_monster}!`)
        }
        
        
        let self = this, flash_sprite = Sup.getActor('Polaroid Flash'), opacity = { alpha: 0 }
        
        let flash_tween = new Sup.Tween(flash_sprite, opacity)
        flash_tween.to({ alpha: 1 }, 123)
        flash_tween.onUpdate(() => {
            flash_sprite.spriteRenderer.setOpacity( opacity.alpha )
        })
        flash_tween.onComplete(() => {
            fade_tween.start()
        })
        
        let fade_tween = new Sup.Tween(flash_sprite, opacity)
        fade_tween.to({ alpha: 0 }, 888)
        fade_tween.onUpdate(() => {
            flash_sprite.spriteRenderer.setOpacity( opacity.alpha )
        })
        fade_tween.onComplete(() => {
            if( Sup.getActor('Monster').getBehavior(MonsterBehavior).active ) Sup.getActor('Monster').getBehavior(MonsterBehavior).hide()
            
            let player = Sup.getActor('Player').getBehavior(PlayerBehavior)
            if( player.state != 'MOVING' ) player.state = 'MOVABLE'
        })
        
        flash_tween.start()
        
        Sup.Audio.playSound('Audio/Camera Flash');
        
        Sup.getActor('Player').getBehavior(PlayerBehavior).state = 'TAKING PICTURE'
        
    }
    
    
    float_text() {
        
        let self = this, text = Sup.getActor('Event Text'), position = { y: -0.137 }
        
        let float_text_tween = new Sup.Tween(text, position)
        float_text_tween.to({ y: 0.137 }, 1500)
        float_text_tween.onUpdate(() => {
            text.setLocalY( position.y )
        })
        
        float_text_tween.start()
        
    }
    
}

Sup.registerBehavior(MainGameScriptBehavior);