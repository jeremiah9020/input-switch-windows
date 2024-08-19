import validateHotkey from '#helper/validator/hotkey'

export default function validate(hotkeys) {
    const parsed = hotkeys.split(' ').map(x => x.replace(/_/gi, ' '));
    
    let validated = true;
    for (const hotkey of parsed) {
        if (!validateHotkey(hotkey)) {
            validated = false;
            break;
        }
    }

    return [validated, parsed];
}