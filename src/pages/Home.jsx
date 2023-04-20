import React from 'react'
import { motion, AnimatePresence, color } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import { Box, Button, Grid, Typography, } from '@mui/material'
import { slideAnimation,fadeAnimation, headTextAnimation, headContainerAnimation } from '../config/motion'
import Canvas from '../canvas'
import Customiser from './Customiser'
const Home = () => {
    const snap = useSnapshot(state)
    return (
        <AnimatePresence>
            {
                snap.intro && (
                    <><motion.div className='home' {...slideAnimation('left')}>
                        <motion.header {...slideAnimation('down')}>
                            <img src='./vite.svg' alt='logo' className='' style={{width:'50px'}} />
                        </motion.header>
                    </motion.div>
                    <motion.div {...headContainerAnimation}>
                        <Box sx={{minHeight:'92vh'}}>
                            <Grid container>

                                <Grid  xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <Typography sx={{ fontSize: { xs: 60, md: 80,xl:100 }, fontWeight: 'bold', paddingLeft: { xs: 3, md: 5 } }} variant='h2' component={motion.h2} {...headTextAnimation}>ADD YOUR MAGIC <span style={{color:'#FFA200'}}>TOUCH</span></Typography>
                                    <Typography sx={{ fontSize: { xs: 12, md: 16,xl:18 }, fontWeight: '200', paddingLeft: { xs: 3, md: 5 }, color: 'grey' }}  variant='p' component={motion.p} {...headContainerAnimation}>When all that inspiration goes into your shoe design, anything feels possible. Voilà! Try your hand at making that so-you shoe with Nike’s co-creation service.</Typography>
    
                                    <Button sx={{ fontSize: { sx: 7, md: 16,xl:18 }, fontWeight: '200', marginLeft: { xs: 3, md: 5 },marginTop:1.5 }}  variant='outlined' color='success'  onClick={() => state.intro=false}>Start Customization</Button>
                                </Grid>
                                <Grid xs={12} md={6}   >
                                    <Box sx={{height:{xs:'40vh',md:'100vh'}}}>
                                    <motion.div style={{height:'100%'}} {...headTextAnimation}>
                                        <Canvas rotate={true}/>
                                    </motion.div>
                                    </Box>
                                   
                                </Grid>
                            </Grid>
                        </Box>
                        </motion.div>
                    </>

                )
            }
        </AnimatePresence>
    )
}

export default Home