const fs = require('fs-extra')
const path = require('path')
const os = require('os')

const foundryPaths = Object.freeze({
    win32: path.join(os.homedir(), 'AppData/Local/FoundryVTT/Data/systems/'),
    darwin: path.join(
        os.homedir(),
        'Library/Application Support/FoundryVTT/Data/systems/'
    ),
    linux: path.join(os.homedir(), '.local/share/FoundryVTT/Data/systems/'),
})

const systemName = 'pokemon_carbon'
const foundrySystemsPath = foundryPaths[os.platform()]
const symlinkTarget = path.join(foundrySystemsPath, systemName)
const distPath = path.resolve(__dirname, '../dist/') //link source is our dist folder

if (!foundrySystemsPath) {
    console.error(`foundry vtt path not found for platform ${os.platform()}`)
    process.exit(1)
}

if (!fs.existsSync(foundrySystemsPath)) {
    console.error(`foundry vtt systems not found at ${foundrySystemsPath}`);
    process.exit(1)
}

if (fs.existsSync(symlinkTarget)) {
    console.error(`symlink target already exists at ${symlinkTarget}`)
    console.error(`Remove the system "${systemName}" to create a symlink`)
    process.exit(1)
}

if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath)
}

try {
    fs.symlinkSync(distPath, symlinkTarget, 'junction')
    console.log(`symlink created between ${distPath} and ${symlinkTarget}`)
} catch (error) {
    console.error(error);
    console.error(`ERROR: failed to create symlink between ${distPath} and ${symlinkTarget}`);
    console.log(`You may need to run this script as ${os.platform() === 'win32' ? 'administrator' : 'sudo'}`)
}
