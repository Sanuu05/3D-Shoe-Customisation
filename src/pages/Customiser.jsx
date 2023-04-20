import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import state from '../store'
import { Box, Grid, Button, Typography } from '@mui/material'
import Canvas from '../canvas'
import ColorPicker from './ColorPicker'
const Customiser = () => {
  const snap = useSnapshot(state)
  return (
    (
      snap.intro === false && (
        <div className='customise'>
        <Box >
          <Grid container sx={{ minHeight: { xs: '100vh' },width:'100%', position: 'relative' }}>
            <Grid xs={12} >
              <Canvas />

            </Grid>
            <Box sx={{ position: 'absolute', right: 0, top: { xs: 0, md: 0 } }}>
              <ColorPicker />
            </Box>
            <Box sx={{ position: 'absolute', left: 0, top: { xs: 0, md: 0 } }}>
              <Button sx={{ fontSize: { sx: 7, md: 18 }, fontWeight: '200', marginLeft: { xs: 3, md: 5 }, marginTop: 1.5 }} variant='outlined' color='secondary' onClick={() => state.intro = true}>Back</Button>
            </Box>
            <Box sx={{ position: 'absolute',right:{xs:'30%',md:'50%'},top:20 ,fontSize: { xs: 50, md: 70,xl:90 }, fontWeight: 'bold' ,textTransform:'capitalize'}}>
              <Typography variant='h2' color={snap.items[snap.current]!=='#ffffff'&& (snap.items[snap.current])}>{snap.current}</Typography>
            </Box>


          </Grid>
        </Box>
        </div>
      )
    )

  )
}

export default Customiser