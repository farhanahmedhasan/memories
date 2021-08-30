import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },

  paper: {
    padding: '1rem',
    position: 'sticky',
    top: '5vh',
  },

  form: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  textField: {
    margin: '10px 0',
    width: '97%',
  },

  btnSubmit: {
    marginBottom: 10,
  },
}));
