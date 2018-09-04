class AlbumScriptBehavior extends Sup.Behavior {
    
    
    
    
    awake() {
        
        let x
        
        x = -4.6
        save_data.captured_monsters.Earth.forEach((monster_name) => {
            let monster_card = Sup.appendScene('Scenes/Prefabs/Card', this.actor.getChild('Earth Roll'))[0]
            
            monster_card.setLocalPosition(x, 0, 0.001)
            monster_card.setLocalScale(0.75, 0.75, 1)
            x += 0.85
            
            monster_card.addBehavior(CardSetupScriptBehavior, { monster_type: 'Earth', monster_name: monster_name})
        })
        this.actor.getChild('Earth Roll').getChild('Info Text').textRenderer.setText(`${save_data.captured_monsters.Earth.length}/11 EARTH`)
        
        x = 4.55
        save_data.captured_monsters.Water.forEach((monster_name) => {
            let monster_card = Sup.appendScene('Scenes/Prefabs/Card', this.actor.getChild('Water Roll'))[0]
            
            monster_card.setLocalPosition(x, 0, 0.001)
            monster_card.setLocalScale(0.75, 0.75, 1)
            x -= 0.85
            
            monster_card.addBehavior(CardSetupScriptBehavior, { monster_type: 'Water', monster_name: monster_name})
        })
        this.actor.getChild('Water Roll').getChild('Info Text').textRenderer.setText(`${save_data.captured_monsters.Water.length}/11 WATER`)
        
        x = -4.55
        save_data.captured_monsters.Death.forEach((monster_name) => {
            let monster_card = Sup.appendScene('Scenes/Prefabs/Card', this.actor.getChild('Death Roll'))[0]
            
            monster_card.setLocalPosition(x, 0, 0.001)
            monster_card.setLocalScale(0.75, 0.75, 1)
            x += 0.85
            
            monster_card.addBehavior(CardSetupScriptBehavior, { monster_type: 'Death', monster_name: monster_name})
        })
        this.actor.getChild('Death Roll').getChild('Info Text').textRenderer.setText(`${save_data.captured_monsters.Death.length}/11 DEATH`)
        
        
        Sup.Audio.playSound('Audio/Camera Shutter');
    
    }

    
    update() {
        
        if( Sup.Input.wasMouseButtonJustPressed(2) ) this.actor.destroy()
    
    }
    
}

Sup.registerBehavior(AlbumScriptBehavior);