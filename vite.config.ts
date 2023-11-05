import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { constants, promises as fsp } from 'fs'
import commonjs from '@rollup/plugin-commonjs'
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)


async function myPlugin(envConfig, envFile) {
  const runtimeConfig: any = {}
  let envConfigExists = true
  try {
    await fsp.access(envConfig, constants.F_OK)
  } catch (err) {
    console.log(`${envConfig} does not exist. Creating one...`)
    envConfigExists = false
  }

  if (envConfigExists) {
    await fsp.unlink(envConfig)
  }
  try {
    await fsp.access(envFile, constants.F_OK)
  } catch (err) {
    throw err
  }

  const content = await fsp.readFile(envFile, 'utf8')

  content.split(/\r?\n/)
    .map((line: any) => line.split('#')[0].trim())
    .forEach((line: any) => {
      const equalSignIndex = line.indexOf('=')
      const lengthOfString = line.length

      if (equalSignIndex !== -1) {
        const key = line.slice(0, equalSignIndex)
        const value = line.slice(equalSignIndex + 1, lengthOfString)
        runtimeConfig[key] = value
      }
    })

  if (!Object.keys(runtimeConfig).length) {
    throw new Error(
      'Could not generate runtime config. Check your .env format!'
    )
  }

  const result = `window.__RUNTIME_CONFIG__ = ${JSON.stringify(runtimeConfig)};`

  await fsp.writeFile(envConfig, result, 'utf-8')

}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: process.env.BASE || '',
    plugins: [
      react(),
      ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') })
    ],
    optimizeDeps: {
      include: []
    },
    build: {
      plugins: [
        myPlugin('./public/runtime-config.js', `./.env.${mode}`)
      ],
      rollupOptions: {
        plugins: [commonjs()]
      },
      commonjsOptions: {
        exclude: [/./]
      }
    },
    server: {
      port: 3000
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
  }
})

