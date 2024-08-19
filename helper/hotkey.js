import validate from '#validator/hotkeys';
import resetHotkey from '#helper/hotkey/reset';
import setHotkey from '#helper/hotkey/set';
import getHotkey from '#helper/hotkey/get';

export default async function run(environment, source, display) {
    if (environment.flags.includes('-r') || environment.flags.includes('--reset')) {
        return resetHotkey(environment.configPath, source, display);
    }

    let hotkey;
    if (environment.flags.includes('-l' || environment.flags.includes('--listen'))) {
        hotkey = await getHotkey();
    } else {
        hotkey = environment.commands[2];
    }

    const [validated] = validate(hotkey);

    if (validated) {
       setHotkey(hotkey, environment.configPath, source, display);
    } else {
        console.log('Could not set hotkey, invalid input')
    }
}