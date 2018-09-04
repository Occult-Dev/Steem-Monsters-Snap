class MainMenuScriptBehavior extends Sup.Behavior {
    
    polaroid_tween:Sup.Tween
    
    
    awake() {
        
        let self = this, camera_1 = this.actor.getChild('Polaroid 1'), camera_2 = this.actor.getChild('Polaroid 2'), position = { y: 3.14 }
        
        this.polaroid_tween = new Sup.Tween(camera_1, position)
        this.polaroid_tween.to({ y: 3.911 }, 1357)
        this.polaroid_tween.onUpdate(() => {
            camera_1.setY( position.y )
            camera_2.setY( position.y )
        })
        this.polaroid_tween.easing(TWEEN.Easing.Quintic.InOut)
        this.polaroid_tween.yoyo(true)
        this.polaroid_tween.repeat(Infinity)
        
        this.polaroid_tween.start()
    
    }

    
    update() {
        
        if( this.actor.getChild('Play Text').fMouseInput.isMouseOver ) {
            this.actor.getChild('Play Text').textRenderer.setText('PLAY')
            this.actor.getChild('Play Text').textRenderer.setColor( new Sup.Color(0xffffff) )
            
            if( Sup.Input.wasMouseButtonJustPressed(0) ) {
                this.polaroid_tween.stop()
                Sup.loadScene('Scenes/Main Game')
            }
        }
        else {
            this.actor.getChild('Play Text').textRenderer.setText('play')
            this.actor.getChild('Play Text').textRenderer.setColor( new Sup.Color(0x8c8c8c) )
        }
        
        
        if( this.actor.getChild('Steemit Username Text').fMouseInput.isMouseOver ) {
            this.actor.getChild('Steemit Username Text').textRenderer.setColor( new Sup.Color(0x7eeec1) )
            
            if( Sup.Input.wasMouseButtonJustPressed(0) ) {
                let link = window.open('https://steemit.com/@stuffbyspencer', '_blank')
                link.opener = null
            }
        }
        else this.actor.getChild('Steemit Username Text').textRenderer.setColor( new Sup.Color(0x76bca0) )
    
    }
    
}

Sup.registerBehavior(MainMenuScriptBehavior);