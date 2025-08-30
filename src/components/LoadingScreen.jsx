import React from 'react'
import { motion } from 'framer-motion'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../store'

const LoadingScreen = () => {
    const snap = useSnapshot(state)

    if (!snap.isLoading) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <motion.div
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <CircularProgress 
                        size={60}
                        sx={{ 
                            color: 'var(--accent-color)',
                            marginBottom: 3
                        }} 
                    />
                </motion.div>
                
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            color: 'white',
                            fontWeight: 600,
                            marginBottom: 1
                        }}
                    >
                        Loading Customizer
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem'
                        }}
                    >
                        Preparing your 3D workspace...
                    </Typography>
                </motion.div>
            </Box>
        </motion.div>
    )
}

export default LoadingScreen
