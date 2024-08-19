#! /usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, basename, join } from 'path';
import fs from 'fs'

import parseCommandMap from '#parser/commandMap';
import parseArguments from '#parser/arguments';

const environment = {};

environment.argv = process.argv.splice(2);
environment.argc = environment.argv.length;

const url = fileURLToPath(import.meta.url);

environment.filename = basename(url);
environment.dirname = dirname(url);
environment.configPath = join(environment.dirname, '../config.json')

const commandMapPath = join(environment.dirname, '..', 'command_map.json');
const commandMapInput = fs.readFileSync(commandMapPath, {encoding: 'utf-8'});
const args = parseArguments(environment);

parseCommandMap(commandMapInput, environment).then(async commandMap => {
    const {commands, flags} = args
    const command = commandMap.getCommand(commands)

    if (command == null) {
        if (flags.includes('-h') || flags.includes('--help')) {
            console.log('\n' + commandMap.getHelp());
        } else {
            const checkCommands = [...commands]
            while (checkCommands.length > 0 && commandMap.getCommand(checkCommands) == null) {
                checkCommands.pop();
            }
    
            console.log(`\nNot a valid command, run "ddccli ${checkCommands.map(x => `${x} `).join('')}-h" for help\n`)
        }        
    } else {
        if (flags.includes('-h') || flags.includes('--help')) {
            console.log('\n' + command.getHelp(true))
        } else {
            environment.commands = commands
            environment.flags = flags
            await command.execute(environment)
        }
    }
})






