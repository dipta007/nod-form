import React from 'react';
import Form from './hooks/Form'
import { Container, makeStyles, ThemeProvider } from '@material-ui/core'
import theme from './util/theme'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(8),
  }
}))

function App() {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" className={classes.container}>
        <Form />
      </Container>
    </ThemeProvider>
  );
}

export default App;
