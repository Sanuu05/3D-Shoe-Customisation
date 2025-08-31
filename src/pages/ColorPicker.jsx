import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import state from '../store'

const ColorPicker = () => {
    const snap = useSnapshot(state)
    
    const handleColorChange = (color) => {
        state.items[snap.current] = color.hex
        
        // Add to color history
        if (!state.colorHistory.includes(color.hex)) {
            state.colorHistory.unshift(color.hex)
            if (state.colorHistory.length > 10) {
                state.colorHistory.pop()
            }
        }
    }
    
    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '100%' }}>
            <SketchPicker 
                color={snap.items[snap.current]}
                disableAlpha
                onChange={handleColorChange}
                width={260}
                styles={{
                    default: {
                        picker: {
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '15px',
                            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                            fontFamily: 'Inter, sans-serif',
                            maxWidth: '100%'
                        },
                        saturation: {
                            borderRadius: '8px 8px 0 0',
                            overflow: 'hidden'
                        },
                        hue: {
                            borderRadius: '0 0 8px 8px',
                            overflow: 'hidden'
                        },
                        color: {
                            borderRadius: '50%',
                            border: '3px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                        },
                        controls: {
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px'
                        },
                        activeColor: {
                            borderRadius: '8px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                        }
                    }
                }}
            />
        </div>
    )
}

export default ColorPicker