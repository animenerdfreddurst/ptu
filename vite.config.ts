import type { UserConfig } from 'vite'
import path from 'path'

const config: UserConfig = {
    root: 'src/',
    base: '/systems/ptu/',
    publicDir: path.resolve(__dirname, 'static'),

    server: {
        port: 30001,
        open: false,
        proxy: {
            '^(?!/systems/ptu)': 'http://localhost:30000/',
            '/socket.io': {
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
                StyleSheet: path.resolve(__dirname, 'src/css/styles.css')
            },
            output: {
                entryFileNames: 'main.js',
                // assetFileNames: 'styles.css',
            },
            external: (id) => {
                // don't try to bundle assets as they are in the public folder
                return id.includes('/assets/')
            },
        },
        copyPublicDir: true,
        cssMinify: undefined
    },

    plugins: [
        {
            name: 'foundry-system-assets',
            configureServer(server) {
                // Watch for changes in templates and reload
                const { watcher } = server
                watcher.add(['static/templates/**/*.hbs'])
            },
            handleHotUpdate(ctx) {
                // Trigger reload for template files
                if (ctx.file.endsWith('.hbs')) {
                    ctx.server.ws.send({
                        type: 'full-reload',
                    })
                    return []
                }
            },
        },
    ],
}

export default config
