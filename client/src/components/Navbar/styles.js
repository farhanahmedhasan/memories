import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '.5rem',
    margin: '2.5rem 0',
    padding: '0px 50px',
  },

  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  appBarHeading: {
    color: 'rgba(0,183,255,1)',
    textDecoration: 'none',
  },

  appBarLogo: {
    marginLeft: '.8rem',
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  profile: {
    width: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  user: {
    display: 'flex',
    alignItems: 'center',
  },

  avatar: {
    marginRight: '5px',
  },
}));
