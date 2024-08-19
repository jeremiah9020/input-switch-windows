
export class Command {
    /** @type {string} */
    name

    /** @type {string} */
    #help;

    /** @type {string} */
    #commandPath;

    /** @type {{[key: string]: Command}} */
    #subcommands;

    /** @type {{name: string, alias: string, description: string}[]} */
    #flags;

    /**
     * 
     * @param {string} name 
     * @param {string} helpText 
     * @param {{[key: string]: Command}} commandPath 
     * @param {{name: string, alias: string, description: string}[]} flags 
     */
    constructor(name, helpText, commandPath, flags) {
        this.name = name;
        this.#commandPath = commandPath;
        this.#help = helpText;
        this.#subcommands = {};
        this.#flags = flags
    }

     /**
     * Gets the command by name
     * @param {string[]} commands
     */
     getCommand(commands) {
        const [name, ...newCommands] = commands;

        if (this.#subcommands.hasOwnProperty(name)) {
            return this.#subcommands[name].getCommand(newCommands);
        } else {
            return this
        }
    }

    /**
     * Adds a new subcommand to the command
     * @param {Command} subCommand 
     */
    registerSubCommand(subCommand) {
        this.#subcommands[subCommand.name]= subCommand
    }

    /**
     * executes the command
     */
    async execute(environment) {
        try {
            const cmdFile = await import(this.#commandPath)
            await cmdFile.default(environment)
        } catch (err) {
            console.log(`Failed to execute command ${this.name} at ${this.#commandPath}`)
        }
    }

    /**
     * Gets the help text, with optionally the children's help text
     * @param {boolean} showChildren 
     * @returns the help text
     */
    getHelp(showChildren = false) {
        let helpText = this.#help;

        if (showChildren) {
            helpText += '\n'
    
            const iterableSubCommands = Object.values(this.#subcommands)
            if (iterableSubCommands.length > 0) {
                helpText += '\nSUBCOMMANDS\n'
    
                for (const subcommand of iterableSubCommands) {
                    helpText += `${subcommand.name}\t${subcommand.getHelp()}\n`
                }
            }

            if (this.#flags && this.#flags.length > 0) {
                helpText += '\nFLAGS\n'
    
                for (const flag of this.#flags) {
                    helpText += `${flag.name.padEnd(20, ' ')}${flag.alias.padEnd(10, ' ')}${flag.description}\n`
                }
            }
        }

        return helpText  
    }
}
