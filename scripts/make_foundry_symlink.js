const fs = require('fs-extra')
const path = require('path')
const os = require('os')
import { select, input } from '@inquirer/prompts'
import { link } from 'fs'

const systemName = 'ptu'

const distPath = path.resolve(__dirname, '../dist/') //link source is the dist folder

const foundryPaths = Object.freeze({
    win32: path.join(os.homedir(), 'AppData/Local/FoundryVTT/Data/systems/'),
    darwin: path.join(
        os.homedir(),
        'Library/Application Support/FoundryVTT/Data/systems/'
    ),
    linux: path.join(os.homedir(), '.local/share/FoundryVTT/Data/systems/'),
})

function validatePath(pathToValidate, verbose = false) {
    let pathIsValid = true
    if (!fs.existsSync(pathToValidate)) {
        pathIsValid = false
        if (verbose) console.error(`${path} does not exist`)
    }

    return pathIsValid
}

async function promptForPath(defaultOption = '') {
    const customPath = await input({
        message: 'Input full path to Foundry VTT system folder',
        default: defaultOption,
        required: true,
        validate: (inputStr) => {
            if (!validatePath(inputStr)) {
                return `Invalid path: ${inputStr}. Check your spelling and that the path is not relative.`
            } else if (validatePath(path.join(inputStr, systemName))) {
                return `${systemName} already exists at ${inputStr}`
            } else {
                return true
            }
        },
    })
    return path.join(customPath, systemName)
}

// get os Foundry system path and make sure it exists
const foundrySystemsPath = foundryPaths[os.platform()]
let defaultDisabled
let defaultSymlinkTarget
if (foundrySystemsPath && validatePath(foundrySystemsPath)) {
    defaultSymlinkTarget = path.join(foundrySystemsPath, systemName)
    if (validatePath(defaultSymlinkTarget)) {
        defaultDisabled = `(folder ${systemName} already exists at ${foundrySystemsPath})`
    }
} else {
    defaultDisabled = `(No Foundry VTT path available for ${os.platform()})`
}

let choices = []
choices.push({
    name: 'Default Foundry VTT path',
    value: foundrySystemsPath,
    description: foundrySystemsPath,
    disabled: defaultDisabled,
})
choices.push({
    name: 'Custom path',
    value: '',
    description: 'Use a custom path',
})
choices.push({ name: 'Exit', value: null, description: 'Exit' })

const optionChoice = await select({
    message: `Select the path to create a symlink for ${systemName} at?`,
    choices: choices,
})
let linkTarget
if (optionChoice === '') {
    linkTarget = await promptForPath(foundrySystemsPath)
} else if (optionChoice != null) {
    linkTarget = foundrySystemsPath
} else {
    process.exit(1)
}

// make dist path in case build has not been run yet
if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath)
}

try {
    linkTarget = path.join(linkTarget, systemName)
    fs.symlinkSync(distPath, linkTarget, 'junction')
    console.log(`symlink created between ${distPath} and ${linkTarget}`)
} catch (error) {
    console.error(error)
    console.error(
        `ERROR: failed to create symlink between ${distPath} and ${linkTarget}`
    )
    console.log(
        `You may need to run this script as ${os.platform() === 'win32' ? 'administrator' : 'sudo'}`
    )
}
