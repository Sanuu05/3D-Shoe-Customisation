import {proxy} from 'valtio'

const defaultColors = {
    laces:"#ffffff",
    mesh:'#ffffff',
    caps:'#ffffff',
    inner:'#ffffff',
    sole:'#ffffff',
    stripes:'#ffffff',
    band:'#ffffff',
    patch:'#ffffff'
}

const presetPalettes = {
    neon: {
        laces:"#ff0080",
        mesh:'#00ff80',
        caps:'#8000ff',
        inner:'#ff8000',
        sole:'#0080ff',
        stripes:'#ff0040',
        band:'#40ff00',
        patch:'#4000ff'
    },
    ocean: {
        laces:"#1e40af",
        mesh:'#0ea5e9',
        caps:'#0284c7',
        inner:'#075985',
        sole:'#0c4a6e',
        stripes:'#0369a1',
        band:'#0891b2',
        patch:'#164e63'
    },
    sunset: {
        laces:"#f97316",
        mesh:'#ef4444',
        caps:'#eab308',
        inner:'#dc2626',
        sole:'#ea580c',
        stripes:'#f59e0b',
        band:'#d97706',
        patch:'#b91c1c'
    },
    forest: {
        laces:"#16a34a",
        mesh:'#15803d',
        caps:'#166534',
        inner:'#14532d',
        sole:'#365314',
        stripes:'#22c55e',
        band:'#4ade80',
        patch:'#84cc16'
    },
    monochrome: {
        laces:"#000000",
        mesh:'#374151',
        caps:'#6b7280',
        inner:'#9ca3af',
        sole:'#d1d5db',
        stripes:'#1f2937',
        band:'#4b5563',
        patch:'#111827'
    }
}

 const state=proxy({
    intro:true,
    current:null,
    items: {...defaultColors},
    savedDesigns: [],
    presetPalettes,
    defaultColors,
    colorHistory: [],
    isLoading: false
 })

 export default state