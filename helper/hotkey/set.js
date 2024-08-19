import fs from 'fs';

export default function set(hotkey, configPath, source, display) {
    try {
        
        const contents = fs.readFileSync(configPath, {encoding: 'utf-8'})
        const parsed = JSON.parse(contents.trim())
        parsed.hotkeys[source] = hotkey    
        fs.writeFileSync(configPath, JSON.stringify(parsed))
        console.log(`\nSet hotkey for ${display} to ${hotkey.split(' ').join(',')}\n`)
    } catch (e) {
        console.error (e)
    }
    }