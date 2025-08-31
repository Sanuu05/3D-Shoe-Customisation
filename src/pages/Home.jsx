import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import { Box, Button, Grid, Typography } from '@mui/material'
import { slideAnimation, fadeAnimation, headTextAnimation, headContainerAnimation } from '../config/motion'
import Canvas from '../canvas'
import Customiser from './Customiser'

const Home = () => {
    const snap = useSnapshot(state)
    return (
        <AnimatePresence>
            {snap.intro && (
                <>
                    {/* Clean Background */}
                    <div className="clean-bg"></div>
                    
                    <motion.div className='home' {...slideAnimation('left')}>
                        <motion.header {...slideAnimation('down')} style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
                            <div className="glass-card hover-card" style={{ padding: '15px', display: 'inline-block' }}>
                                <img src='./vite.svg' alt='logo' style={{ width: '40px', height: '40px' }} />
                            </div>
                        </motion.header>
                    </motion.div>
                    
                    <motion.div {...headContainerAnimation}>
                        <Box sx={{ 
                            minHeight: '100vh', 
                            position: 'relative', 
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'center'
                        }}>
                            {/* Text Content */}
                            <Box sx={{ 
                                flex: { xs: 'none', md: 1 },
                                width: { xs: '100%', md: '50%' },
                                height: { xs: 'auto', md: '100vh' },
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'center', 
                                alignItems: { xs: 'center', md: 'flex-start' },
                                padding: { xs: '20px', sm: '30px', md: '50px' },
                                zIndex: 2,
                                position: 'relative',
                                textAlign: { xs: 'center', md: 'left' },
                                order: { xs: 2, md: 1 }
                            }}>
                                <motion.div {...fadeAnimation} style={{ marginBottom: '20px' }}>
                                    <Typography 
                                        className="hero-title"
                                        sx={{ 
                                            fontSize: { xs: '2.5rem', sm: '3rem', md: '4.5rem', xl: '6rem' }, 
                                            fontWeight: 900,
                                            lineHeight: 1.1,
                                            marginBottom: 2
                                        }} 
                                        variant='h1' 
                                        component={motion.h1} 
                                        {...headTextAnimation}
                                    >
                                        CREATE YOUR DREAM{' '}
                                        <span style={{
                                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}>
                                            SHOE
                                        </span>
                                    </Typography>
                                </motion.div>
                                
                                <motion.div {...headContainerAnimation}>
                                    <Typography 
                                        className="hero-subtitle"
                                        sx={{ 
                                            fontSize: { xs: '1rem', md: '1.25rem', xl: '1.5rem' }, 
                                            fontWeight: 400,
                                            marginBottom: 4,
                                            maxWidth: '500px',
                                            lineHeight: 1.6
                                        }}  
                                        variant='p' 
                                        component={motion.p}
                                    >
                                        Transform your vision into reality with our advanced 3D shoe customization platform. 
                                        Every detail, every color, every element crafted to perfection.
                                    </Typography>
                                </motion.div>

                                <motion.div 
                                    {...slideAnimation('up')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button 
                                        className="modern-btn"
                                        sx={{ 
                                            fontSize: { xs: '0.9rem', md: '1rem', xl: '1.1rem' },
                                            padding: { xs: '12px 28px', md: '16px 40px' },
                                            borderRadius: '50px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            fontWeight: 600,
                                            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                            border: 'none',
                                            color: 'white',
                                            boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 25px rgba(79, 172, 254, 0.6)',
                                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                                            }
                                        }}
                                        onClick={() => {
                                            state.isLoading = true
                                            setTimeout(() => {
                                                state.intro = false
                                                state.isLoading = false
                                            }, 800)
                                        }}
                                    >
                                        Start Creating
                                    </Button>
                                </motion.div>
                            </Box>
                            
                            {/* Canvas Section */}
                            <Box sx={{ 
                                flex: { xs: 'none', md: 1 },
                                width: { xs: '100%', md: '50%' },
                                height: { xs: '50vh', md: '100vh' },
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                order: { xs: 1, md: 2 }
                            }}>
                                <motion.div 
                                    style={{ 
                                        height: '100%', 
                                        width: '100%',
                                        position: 'relative'
                                    }} 
                                    {...headTextAnimation}
                                >
                                    {/* Glowing effect behind canvas */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '400px',
                                        height: '400px',
                                        background: 'radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, transparent 70%)',
                                        borderRadius: '50%',
                                        filter: 'blur(40px)',
                                        zIndex: 0
                                    }}></div>
                                    
                                    <Canvas rotate={true} />
                                </motion.div>
                            </Box>
                        </Box>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default Home