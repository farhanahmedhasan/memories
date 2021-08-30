import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: '',
  wrapperSpinner: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    height: '80px !important',
    width: '80px !important',
  },
}));
