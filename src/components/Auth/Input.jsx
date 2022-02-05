import React from 'react';
import {Grid, TextField, InputAdornment, IconButton} from '@material-ui/core';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Input({name,value, half , handlechange, label, autoFocus, type, handleShowPassword}) {

   return (
      <Grid item xs={12} sm={half ? 6 : 12}>
         <TextField
            name={name}
            value={value}
            onChange={handlechange}
            variant='outlined'
            required
            fullWidth
            label = {label}
            autoFocus={autoFocus}
            type={type}
            InputProps= { name ==='password' ? {
               endAdornment:(
                  <InputAdornment position='end'>
                     <IconButton onClick={handleShowPassword}>
                        {type === 'password'? <VisibilityIcon/> : <VisibilityOffIcon/>}
                     </IconButton>
                  </InputAdornment>
               )
            }: null}
         />
      </Grid>
   );
}

export default Input;
