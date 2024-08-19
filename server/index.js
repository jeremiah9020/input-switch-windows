#! /usr/bin/env node

import { dirname, basename, join } from 'path';
import {GlobalKeyboardListener} from 'node-global-key-listener';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import fs from 'fs';

import validateHotkeys from '#validator/hotkeys';

const environment = {};
const url = fileURLToPath(import.meta.url);
environment.filename = basename(url);
environment.dirname = dirname(url);

const configPath = join(environment.dirname, '../config.json')
const ddcutilPath = join(environment.dirname, '../bin/winddcutil.exe')

let config = {
    hotkeys: {
        DP: null,
        USBC: null,
        HDMI1: null,
        HDMI2: null,
    }
}

let switching = null;

function setConfig(newConfig) {
    let revert = false;
    if (newConfig.hotkeys) {
        if (newConfig.hotkeys.DP) {
            const [validated, parsed] = validateHotkeys(newConfig.hotkeys.DP)
            if (validated) {
                config.hotkeys.DP = parsed;
            } else {
                revert = true;
            }
        }
        if (newConfig.hotkeys.USBC) {
            const [validated, parsed] = validateHotkeys(newConfig.hotkeys.USBC)
            if (validated) {
                config.hotkeys.USBC = parsed;
            } else {
                revert = true;
            }
        }
        if (newConfig.hotkeys.HDMI1) {
            const [validated, parsed] = validateHotkeys(newConfig.hotkeys.HDMI1)
            if (validated) {
                config.hotkeys.HDMI1 = parsed;
            } else {
                revert = true;
            }
        }
        if (newConfig.hotkeys.HDMI2) {
            const [validated, parsed] = validateHotkeys(newConfig.hotkeys.HDMI2)
            if (validated) {
                config.hotkeys.HDMI2 = parsed;
            } else {
                revert = true;
            }
        }
    }

    if (revert) {
        fs.writeFileSync(configPath, JSON.stringify(config))
    }
}

if (fs.existsSync(configPath)) {
    try {
        const contents = fs.readFileSync(configPath, {encoding: 'utf-8'})
        const parsed = JSON.parse(contents.trim())
        setConfig(parsed)
    } catch (err) {
        fs.writeFileSync(configPath, JSON.stringify(config))
    }
} else {
    fs.writeFileSync(configPath, JSON.stringify(config))
} 

fs.watchFile(configPath, function(eventType, filename) {
    try {
        const contents = fs.readFileSync(configPath, {encoding: 'utf-8'})
        const parsed = JSON.parse(contents.trim())
        setConfig(parsed)
    } catch (err) {
        fs.writeFileSync(configPath, JSON.stringify(config))
    }
});

const v = new GlobalKeyboardListener();
v.addListener((e, down) => {
    if (switching) {
        if (switching === 'DP') {
            if (nonePressed(config.hotkeys.DP, down)) {
                switching = null;
                exec(`${ddcutilPath} setvcp 1 0x60 15`)
            }
        } else if (switching === 'USBC') {
            if (nonePressed(config.hotkeys.USBC, down)) {
                switching = null;
                exec(`${ddcutilPath} setvcp 1 0x60 16`)
            }
        } else if (switching === 'HDMI1') {
            if (nonePressed(config.hotkeys.HDMI1, down)) {
                switching = null;
                exec(`${ddcutilPath} setvcp 1 0x60 17`)
            }
        } else if (switching === 'HDMI2') {
            if (nonePressed(config.hotkeys.HDMI2, down)) {
                switching = null;
                exec(`${ddcutilPath} setvcp 1 0x60 18`)
            }
        }
    } else {
        if (e.state == 'DOWN') {
            if (config.hotkeys.DP !== null && allPressed(config.hotkeys.DP, down)) {
                switching = 'DP';
            }
            if (config.hotkeys.USBC !== null && allPressed(config.hotkeys.USBC, down)) {
                switching = 'USBC';
            }
            if (config.hotkeys.HDMI1 !== null && allPressed(config.hotkeys.HDMI1, down)) {
                switching = 'HDMI1';
            }
            if (config.hotkeys.HDMI2 !== null && allPressed(config.hotkeys.HDMI2, down)) {
                switching = 'HDMI2';
            }
        }
    }
});

function allPressed(keys, down) {
    let pressed = true;
    for (const key of keys) {
        if (!down[key]) {
            pressed = false;
            break;
        }
    }
    return pressed;
}

function nonePressed(keys, down) {
    let pressed = false;
    for (const key of keys) {
        if (down[key]) {
            pressed = true;
            break;
        }
    }
    return !pressed;
}
