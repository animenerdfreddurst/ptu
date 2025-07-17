import type { UserConfig } from 'vite'
import path from 'path'
import fs from 'fs-extra'

const config: UserConfig = {
    root: 'src/',
    base: '/systems/ptu/',
    publicDir: path.resolve(__dirname, 'static'),

    server: {
        port: 30001,
        open: false,
        proxy: {
            '^(?!/systems/ptu)': 'http://localhost:30000/', //calls to the system are handled by vite
            '/socket.io': {
                //all other calls are passed to foundry
                target: 'ws://localhost:30000',
                ws: true,
            },
        },
    },

    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
        sourcemap: true,
        chunkSizeWarningLimit: 6000,
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'src/main.js'),
                StyleSheet: path.resolve(__dirname, 'src/css/styles.css'),
            },
            output: {
                entryFileNames: 'main.js',
                assetFileNames: 'styles.css',
            },
            external: (id) => {
                // don't try to bundle assets as they are in the public folder
                return id.includes('/assets/')
            },
        },
        copyPublicDir: true,
        cssMinify: undefined,
    },

    plugins: [
        {
            name: 'foundry-system-assets',
            configureServer(server) {
                // Watch for changes in templates and reload
                const { watcher } = server
                watcher.add(['static/templates/**/*.hbs'])
            },
            handleHotUpdate(context) {
                const staticDir = path.resolve(__dirname, 'static')
                const distDir = path.resolve(__dirname, 'dist')

                // Trigger reload for template files
                if (context.file.endsWith('.hbs')) {
                    const contextTimeStamp = new Date(
                        context.timestamp
                    ).toISOString()
                    console.log(
                        `handlebar template file "${context.file}" ${context.type} at ${contextTimeStamp}`
                    )

                    const relativePath = path.relative(staticDir, context.file)
                    const destPath = path.join(distDir, relativePath)

                    fs.copy(context.file, destPath)
                        .then(() => {
                            console.log(
                                `${context.file} successfully copied to ${destPath}`
                            )
                        })
                        .catch((error) => {
                            console.error(
                                `failed to copy ${context.file} to ${destPath}`
                            )
                            console.error(error)
                        })
                    
                    // uncomment the below to make the page reload when a *.hbs file is updated
                    // context.server.ws.send({
                    // type: 'full-reload',
                    // })

                    return undefined
                }
                return undefined
            },
        },
    ],
}

export default config
