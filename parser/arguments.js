/**
 * Parses the arguments, separating flags from commands
 * @param {{argv: string[]}} environment 
 * @returns 
 */
export default function parse(environment) {
    const argv = environment.argv;
    const commandList = [];
    const flagList = [];

    for (const arg of argv) {
        if (arg.startsWith('-') || arg.startsWith('--')) {
            flagList.push(arg)
        } else {
            commandList.push(arg)
        }
    }

    return {commands: commandList, flags: flagList}
}