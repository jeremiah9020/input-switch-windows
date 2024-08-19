import { join } from 'path'

import { Command } from '#class/Command';
import { CommandMap } from '#class/CommandMap';

/**
 * Parses a command map
 * @param {string} data 
 */
export default async function parse(data, environment) {
    const commands = JSON.parse(data)
    const commandMap = new CommandMap();

    for (const key in commands) {
        const command = await parseCommand(key, commands[key], environment);
        commandMap.registerCommand(command);
    }

    return commandMap;
}

/**
 * Parses a command
 * @param {string} name 
 * @param {Command} command 
 * @param {number} level 
 * @param {string} keypath 
 */
async function parseCommand(name, command, environment, level = 0, keypath = '') {
    const commandPath = `#cmd/${keypath}${name}`.replace(/\./gi,'/')
    try {
        await import(commandPath)
    } catch (err) {
        throw new Error(`No command found at path ${commandPath}`)
    }

    const {'-h': help, flags, ...subcommands} = command;

    if (!help) {
        throw new Error(`Help text ('-h') is not defined for command ${keypath}${name}`)
    }

    const newCommand = new Command(name, help, commandPath, flags);

    for (const key in subcommands) {
        const subcommand = await parseCommand(key, subcommands[key], environment, level + 1, keypath + `${name}.`);
        newCommand.registerSubCommand(subcommand);
    }
    
    return newCommand
}