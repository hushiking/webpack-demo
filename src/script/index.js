import '../style/index.css'
import '../style/index.less'
import '../style/index.sass'
import '../style/index.scss'
import NavTpl from '../tpl/tpl'

const nav = new NavTpl()

const $ = require('jquery')
$('body').prepend(nav.tpl)
console.log($)
console.log($('p').html())


const sayHi = () => {
    console.log('hi~')
}
sayHi()

const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5]

console.log('入口文件')
console.log('webpack起始')
