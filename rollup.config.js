import buble from "rollup-plugin-buble"
import resolve from 'rollup-plugin-node-resolve'
import collectSass from 'rollup-plugin-collect-sass'

export default [{
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'alert',
    sourceMap: 'inline',
    plugins: [
        collectSass({
            extract: true
        }),
        buble({ 
            jsx: "h",
            objectAssign: "Object.assign",
        }),
        resolve()
    ],
    dest: 'dist/alert.js'
}]