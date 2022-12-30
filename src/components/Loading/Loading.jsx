import React from 'react';
import { Box } from '@mui/material';
import loadingImg from '../../imgs/loading2.gif'

function Loading() {
  return (
    <Box sx={{ display: 'flex', justifyContent: "center", height: "100%", alignItems: "center" }}>
      <img src={loadingImg} alt="loading" />
    </Box>
  );
}

export default Loading;