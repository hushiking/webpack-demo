import tpl from './tpl.ejs'
import './tpl.css'

const data = {
    title: '我是导航',
    lists: ['杰克', '赛文', '泰罗', '艾斯', '佐菲', '奥特曼']
}

console.log(tpl)
const tplData = tpl(data)
console.log(tplData)

export default function Tpl() {
    return {
        tpl: tplData
    }
}