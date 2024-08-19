export class CommandMap {
    /** @type {{[key: string]: Command}} */
    #commands

    /**
     * Registers a new commandMap
     */
    constructor() {
        this.#commands = {};
    }

    /**
     * Gets the command by name
     * @param {string[]} commands
     * @returns {import('#class/Command').Command | null}
     */
    getCommand(commands) {
        const [name, ...newCommands] = commands;

        if (this.#commands.hasOwnProperty(name)) {
            return this.#commands[name].getCommand(newCommands);
        } else {
            return null
        }
    }

    /**
     * Adds a new command to the commandMap
     * @param {Command} command 
     */
    registerCommand(command) {
        this.#commands[command.name] = command;
    }

     /**
     * Gets the help text
     * @returns the help text
     */
     getHelp() {
        return `ddccli is a command used to switch display inputs\n\nCOMMANDS\n${Object.values(this.#commands).map(x => `${x.name.padEnd(20, ' ')}${x.getHelp()}\n`).join('')}`
    }
}