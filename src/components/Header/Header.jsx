import React from 'react'
import { AppBar, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  padding: {
    padding: theme.spacing(1)
  }
}))

function Header () {
  const classes = useStyles()
  return (
    <div>
      <AppBar position='static' className={classes.padding}>
        <Typography variant='h6'>NOD</Typography>
      </AppBar>
    </div>
  )
}

export default Header
