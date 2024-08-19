import fs from 'fs';

export default function reset(configPath, source, display) {
    const contents = fs.readFileSync(configPath, {encoding: 'utf-8'})
    const parsed = JSON.parse(contents.trim())
    parsed.hotkeys[source] = null;    
    fs.writeFileSync(configPath, JSON.stringify(parsed))
    console.log(`\nReset hotkey for ${display}\n`)
}