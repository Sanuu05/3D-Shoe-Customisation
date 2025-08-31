import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import { 
    Box, 
    Button, 
    Typography, 
    Chip, 
    Grid, 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Tooltip
} from '@mui/material'
import { 
    Save, 
    Refresh, 
    Palette, 
    Download,
    Close,
    FileDownload,
    Shuffle,
    History,
    Share,
    GetApp
} from '@mui/icons-material'

const ControlPanel = () => {
    const snap = useSnapshot(state)
    const [saveDialogOpen, setSaveDialogOpen] = useState(false)
    const [designName, setDesignName] = useState('')

    const saveDesign = () => {
        if (designName.trim()) {
            const newDesign = {
                id: Date.now(),
                name: designName,
                colors: { ...snap.items },
                createdAt: new Date().toLocaleDateString()
            }
            state.savedDesigns.push(newDesign)
            setSaveDialogOpen(false)
            setDesignName('')
        }
    }

    const loadDesign = (design) => {
        Object.keys(design.colors).forEach(key => {
            state.items[key] = design.colors[key]
        })
    }

    const resetColors = () => {
        Object.keys(state.defaultColors).forEach(key => {
            state.items[key] = state.defaultColors[key]
        })
    }

    const applyPreset = (presetName) => {
        const preset = state.presetPalettes[presetName]
        Object.keys(preset).forEach(key => {
            state.items[key] = preset[key]
        })
    }

    const generateRandomColors = () => {
        const getRandomColor = () => {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#10ac84', '#ee5a24', '#0abde3', '#3867d6', '#8c7ae6', '#f368e0', '#fd79a8', '#fdcb6e', '#6c5ce7', '#a29bfe']
            return colors[Math.floor(Math.random() * colors.length)]
        }
        
        Object.keys(state.items).forEach(key => {
            state.items[key] = getRandomColor()
        })
    }

    const addToColorHistory = (color) => {
        if (!state.colorHistory.includes(color)) {
            state.colorHistory.unshift(color)
            if (state.colorHistory.length > 10) {
                state.colorHistory.pop()
            }
        }
    }

    const exportDesign = () => {
        const designData = {
            colors: snap.items,
            timestamp: new Date().toISOString(),
            version: '1.0'
        }
        const dataStr = JSON.stringify(designData, null, 2)
        const dataBlob = new Blob([dataStr], {type: 'application/json'})
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'shoe-design.json'
        link.click()
        URL.revokeObjectURL(url)
    }

    const shareDesign = () => {
        const designData = btoa(JSON.stringify(snap.items))
        const shareUrl = `${window.location.origin}?design=${designData}`
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Design link copied to clipboard!')
        })
    }

    const downloadScreenshot = () => {
        // This would capture the canvas - for now just show alert
        alert('Screenshot feature coming soon!')
    }

    const slideIn = {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.5, ease: "easeOut" }
    }

    return (
        <>
            <Box
                component={motion.div}
                {...slideIn}
                sx={{
                    position: 'absolute',
                    left: { xs: '10px', md: '20px' },
                    bottom: { xs: '10px', md: '20px' },
                    right: { xs: '10px', md: 'auto' },
                    zIndex: 20,
                    pointerEvents: 'auto',
                    '@media (max-width: 768px)': {
                        position: 'fixed',
                        left: '10px',
                        right: '10px',
                        bottom: '10px',
                        maxHeight: '40vh',
                        overflowY: 'auto'
                    },
                    '@media (max-width: 480px)': {
                        left: '5px',
                        right: '5px',
                        bottom: '5px',
                        maxHeight: '35vh'
                    }
                }}
            >
                <div className="glass-card" style={{ 
                    padding: '15px', 
                    maxWidth: '100%',
                    width: '100%'
                }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, marginBottom: 2 }}>
                        Design Controls
                    </Typography>

                    {/* Action Buttons */}
                    <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                        <Grid item xs={6} sm={3}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<Save />}
                                onClick={() => setSaveDialogOpen(true)}
                                sx={{
                                    background: 'var(--accent-gradient)',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    padding: { xs: '6px 12px', sm: '8px 16px' },
                                    minHeight: '36px'
                                }}
                            >
                                <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>Save</Box>
                                <Save sx={{ display: { xs: 'inline', sm: 'none' }, fontSize: '18px' }} />
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<Refresh />}
                                onClick={resetColors}
                                sx={{
                                    borderColor: 'var(--accent-color)',
                                    color: 'var(--accent-color)',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    padding: { xs: '6px 12px', sm: '8px 16px' },
                                    minHeight: '36px',
                                    '&:hover': {
                                        background: 'var(--accent-color)',
                                        color: 'white'
                                    }
                                }}
                            >
                                <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>Reset</Box>
                                <Refresh sx={{ display: { xs: 'inline', sm: 'none' }, fontSize: '18px' }} />
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<Shuffle />}
                                onClick={generateRandomColors}
                                sx={{
                                    background: 'var(--secondary-gradient)',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    padding: { xs: '6px 12px', sm: '8px 16px' },
                                    minHeight: '36px'
                                }}
                            >
                                <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>Random</Box>
                                <Shuffle sx={{ display: { xs: 'inline', sm: 'none' }, fontSize: '18px' }} />
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<Share />}
                                onClick={shareDesign}
                                sx={{
                                    borderColor: 'var(--success-color)',
                                    color: 'var(--success-color)',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    padding: { xs: '6px 12px', sm: '8px 16px' },
                                    minHeight: '36px',
                                    '&:hover': {
                                        background: 'var(--success-color)',
                                        color: 'white'
                                    }
                                }}
                            >
                                <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>Share</Box>
                                <Share sx={{ display: { xs: 'inline', sm: 'none' }, fontSize: '18px' }} />
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Preset Palettes */}
                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)', marginBottom: 1 }}>
                        Quick Palettes
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
                        {Object.keys(snap.presetPalettes).map((presetName) => (
                            <Chip
                                key={presetName}
                                label={presetName}
                                onClick={() => applyPreset(presetName)}
                                sx={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'white',
                                    textTransform: 'capitalize',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        background: 'var(--accent-color)'
                                    }
                                }}
                            />
                        ))}
                    </Box>

                    {/* Color History */}
                    {snap.colorHistory.length > 0 && (
                        <>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', marginBottom: 1 }}>
                                Recent Colors
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
                                {snap.colorHistory.slice(0, 8).map((color, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: color,
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            border: '2px solid rgba(255, 255, 255, 0.3)',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                border: '2px solid var(--accent-color)'
                                            },
                                            transition: 'all 0.2s ease'
                                        }}
                                        onClick={() => {
                                            if (snap.current) {
                                                state.items[snap.current] = color
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </>
                    )}

                    {/* Saved Designs */}
                    {snap.savedDesigns.length > 0 && (
                        <>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', marginBottom: 1 }}>
                                Saved Designs
                            </Typography>
                            <Box sx={{ maxHeight: '120px', overflowY: 'auto' }}>
                                {snap.savedDesigns.map((design) => (
                                    <Box
                                        key={design.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '8px',
                                            marginBottom: '4px',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                background: 'rgba(255, 255, 255, 0.1)'
                                            }
                                        }}
                                        onClick={() => loadDesign(design)}
                                    >
                                        <Box>
                                            <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                                                {design.name}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                                                {design.createdAt}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </>
                    )}

                    {/* Action Icons */}
                    <Box sx={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: 1 }}>
                        <Tooltip title="Export JSON">
                            <IconButton
                                onClick={exportDesign}
                                sx={{
                                    color: 'var(--warning-color)',
                                    '&:hover': {
                                        background: 'rgba(251, 191, 36, 0.1)'
                                    }
                                }}
                            >
                                <GetApp />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Screenshot">
                            <IconButton
                                onClick={downloadScreenshot}
                                sx={{
                                    color: 'var(--accent-color)',
                                    '&:hover': {
                                        background: 'rgba(79, 172, 254, 0.1)'
                                    }
                                }}
                            >
                                <FileDownload />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </div>
            </Box>

            {/* Save Dialog */}
            <Dialog 
                open={saveDialogOpen} 
                onClose={() => setSaveDialogOpen(false)}
                PaperProps={{
                    sx: {
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '15px'
                    }
                }}
            >
                <DialogTitle sx={{ color: 'white' }}>
                    Save Design
                    <IconButton
                        onClick={() => setSaveDialogOpen(false)}
                        sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Design Name"
                        fullWidth
                        variant="outlined"
                        value={designName}
                        onChange={(e) => setDesignName(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                color: 'white',
                                '& fieldset': {
                                    borderColor: 'var(--glass-border)'
                                },
                                '&:hover fieldset': {
                                    borderColor: 'var(--accent-color)'
                                }
                            },
                            '& .MuiInputLabel-root': {
                                color: 'var(--text-secondary)'
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => setSaveDialogOpen(false)}
                        sx={{ color: 'var(--text-secondary)' }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={saveDesign}
                        variant="contained"
                        sx={{ background: 'var(--accent-gradient)' }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ControlPanel
