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
}));
