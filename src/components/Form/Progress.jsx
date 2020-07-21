import React from 'react'
import { LinearProgress, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(4),
  }
}))

function Progress({ progress }) {
  const classes = useStyles()
  return (
    <div className={classes.margin}>
      <Typography variant="h6">Progress: {progress}%</Typography>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  )
}

export default Progress
