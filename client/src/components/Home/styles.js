import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  [theme.breakpoints.down('xs')]: {
    appBarHeading: {
      fontSize: '2.2rem',
    },
  },
  [theme.breakpoints.down(940)]: {
    mainContainer: {
      flexDirection: 'column-reverse',
    },
  },

  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },

  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  input: {
    paddingTop: '0',
  },
}));
