import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import { Box, Grid, Button, Typography, Chip } from '@mui/material'
import { ArrowBack, Palette } from '@mui/icons-material'
import Canvas from '../canvas'
import ColorPicker from './ColorPicker'
import ControlPanel from './ControlPanel'

const Customiser = () => {
  const snap = useSnapshot(state)
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        state.intro = true
      }
      if (event.key === 'r' || event.key === 'R') {
        Object.keys(state.defaultColors).forEach(key => {
          state.items[key] = state.defaultColors[key]
        })
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])
  
  const slideIn = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <AnimatePresence>
      {snap.intro === false && (
        <motion.div 
          className='customise'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Clean Background */}
          <div className="clean-bg"></div>
          
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <Grid container sx={{ minHeight: '100vh', width: '100%', position: 'relative' }}>
              <Grid xs={12}>
                <Canvas />
              </Grid>

              {/* Modern Color Picker Container */}
              <Box
                component={motion.div}
                {...slideIn}
                sx={{
                  position: 'absolute',
                  right: { xs: '10px', md: '20px' },
                  top: { xs: '10px', md: '20px' },
                  zIndex: 10,
                  '@media (max-width: 768px)': {
                    position: 'fixed',
                    right: '10px',
                    top: '10px',
                    maxWidth: 'calc(100vw - 20px)'
                  }
                }}
              >
                <div className="color-picker-container">
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <Palette sx={{ color: 'var(--accent-color)', marginRight: 1 }} />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                      Color Palette
                    </Typography>
                  </Box>
                  <ColorPicker />
                </div>
              </Box>

              {/* Modern Back Button */}
              <Box
                component={motion.div}
                {...slideIn}
                sx={{
                  position: 'absolute',
                  left: { xs: '10px', md: '20px' },
                  top: { xs: '80px', md: '20px' },
                  zIndex: 10,
                  '@media (max-width: 768px)': {
                    position: 'fixed',
                    left: '10px',
                    top: '80px'
                  }
                }}
              >
                <Button
                  className="modern-btn-secondary"
                  startIcon={<ArrowBack />}
                  sx={{
                    fontSize: { xs: '0.8rem', md: '1rem' },
                    fontWeight: 600,
                    padding: { xs: '8px 16px', md: '12px 24px' },
                    borderRadius: '50px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: 'var(--accent-color)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(79, 172, 254, 0.4)'
                    }
                  }}
                  onClick={() => state.intro = true}
                >
                  <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>Back to Home</Box>
                  <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>Back</Box>
                </Button>
              </Box>

              {/* Modern Current Selection Display */}
              {snap.current && (
                <Box
                  component={motion.div}
                  {...fadeIn}
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: { xs: '150px', md: '30px' },
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    '@media (max-width: 768px)': {
                      position: 'fixed',
                      top: '150px',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }
                  }}
                >
                  <div className="glass-card" style={{ padding: '10px 20px', textAlign: 'center' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'var(--text-secondary)', 
                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                        marginBottom: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}
                    >
                      Customizing
                    </Typography>
                    <Chip
                      label={snap.current}
                      sx={{
                        background: snap.items[snap.current] !== '#ffffff' 
                          ? `linear-gradient(135deg, ${snap.items[snap.current]}, ${snap.items[snap.current]}aa)`
                          : 'var(--accent-gradient)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: { xs: '0.9rem', md: '1.2rem' },
                        padding: { xs: '6px 12px', md: '8px 16px' },
                        textTransform: 'capitalize',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                      }}
                    />
                  </div>
                </Box>
              )}

              {/* Floating Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10
                }}
              >
                <div className="glass-card" style={{ padding: '15px 25px', textAlign: 'center' }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'var(--text-secondary)', 
                      fontSize: '0.9rem',
                      fontWeight: 400
                    }}
                  >
                    Click on shoe parts to customize • ESC to go back • R to reset
                  </Typography>
                </div>
              </motion.div>

              {/* Control Panel */}
              <ControlPanel />
            </Grid>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Customiser