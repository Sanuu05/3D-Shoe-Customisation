import {proxy} from 'valtio'


 const state=proxy({
    intro:true,
    current:null,
    items:{
        laces:"#ffffff",
        mesh:'#ffffff',
        caps:'#ffffff',
        inner:'#ffffff',
        sole:'#ffffff',
        stripes:'#ffffff',
        band:'#ffffff',
        patch:'#ffffff'
    }
 })

 export default state