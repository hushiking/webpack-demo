import '../style/index.css'
import '../style/index.less'
import '../style/index.sass'
import '../style/index.scss'

const $ = require('jquery')
console.log($)

const sayHi = () => {
    console.log('index2~')
}
sayHi()

const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5]

console.log('入口文件index2')
console.log('webpack起始index2')
