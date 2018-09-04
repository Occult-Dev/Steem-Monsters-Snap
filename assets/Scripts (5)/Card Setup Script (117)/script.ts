class CardSetupScriptBehavior extends Sup.Behavior {
    
    monster_type:string
    monster_name:string
    
    card:Sup.Actor
    
    enlarged:boolean = false
    expand_tween:Sup.Tween
    collapse_tween:Sup.Tween
    
    list_x_position:number
    
    
    awake() {
        
        this.card = this.actor.getChild('Card Background')
        
        this.list_x_position = this.actor.getLocalX()
    
        // MONSTER IMAGE
        new Sup.SpriteRenderer(this.actor.getChild('Monster Image'), `Images/Monsters/${this.monster_type}/Card`)
        this.actor.getChild('Monster Image').spriteRenderer.setAnimation(this.monster_name)
        
        // CARD FRAME
        new Sup.SpriteRenderer(this.actor.getChild('Card Frame'), `Images/Cards/${this.monster_type}`)
           
        let big_name = this.monster_name.toUpperCase()
        let formated_name = this.stringDivider(big_name, 13, '\n')
        this.actor.getChild('Monster Name').textRenderer.setText(formated_name)
    
    }
    
    
    stringDivider(str, width, spaceReplacer) {
        if (str.length>width) {
            var p=width
            for (;p>0 && str[p]!=' ';p--) {
            }
            if (p>0) {
                var left = str.substring(0, p);
                var right = str.substring(p+1);
                return left + spaceReplacer + this.stringDivider(right, width, spaceReplacer);
            }
        }
        return str;
    }

    
    update() {
    
        if( this.card.fMouseInput.isMouseOver && this.actor.getLocalY() != 0.1 && !this.enlarged ) this.actor.setLocalY(0.1)
        else if( !this.card.fMouseInput.isMouseOver && this.actor.getLocalY() != 0 && !this.enlarged ) this.actor.setLocalY(0)
        
        
        if( Sup.Input.wasMouseButtonJustPressed(0) ) {
            if( !this.enlarged && this.card.fMouseInput.isMouseOver ) {
                this.actor.setZ(1)
                this.expand()
                
                this.enlarged = true
                
                Sup.Audio.playSound('Audio/Card Expand');
            }
            else if( this.enlarged ) {
                this.actor.setLocalZ(0.001)
                this.collapse()
                
                this.enlarged = false
                
                Sup.Audio.playSound('Audio/Card Collapse');
            }
        }
    
    }
    
    
    expand() {
        
        if( this.collapse_tween ) this.collapse_tween.stop()
        
        
        let self = this, properties = { x: this.actor.getX(), y: this.actor.getY(), s_x: 0.75, s_y: 0.75 }
        
        this.expand_tween = new Sup.Tween(this.actor, properties)
        this.expand_tween.to({x: 0, y: 0, s_x: 4, s_y: 4}, 420)
        this.expand_tween.onUpdate(() => {
            self.actor.setPosition(properties.x, properties.y)
            self.actor.setLocalScale(properties.s_x, properties.s_y, 1)
        })
        
        this.expand_tween.easing(TWEEN.Easing.Back.Out)
        
        this.expand_tween.start()
        
    }
    
    
    collapse() {
        
        if( this.expand_tween ) this.expand_tween.stop()
        
        
        let self = this, properties = { x: this.actor.getX(), y: this.actor.getY(), s_x: 4, s_y: 4 }
        
        this.collapse_tween = new Sup.Tween(this.actor, properties)
        this.collapse_tween.to({x: this.list_x_position, y: 0, s_x: 0.75, s_y: 0.75}, 210)
        this.collapse_tween.onUpdate(() => {
            self.actor.setLocalPosition(properties.x, properties.y)
            self.actor.setLocalScale(properties.s_x, properties.s_y, 1)
        })
        
        this.collapse_tween.easing(TWEEN.Easing.Back.Out)
        
        this.collapse_tween.start()
        
    }
    
}

Sup.registerBehavior(CardSetupScriptBehavior);