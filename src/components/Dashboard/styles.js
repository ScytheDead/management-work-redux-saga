const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  wrapperContent: {
    padding: 10,
    width: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easiIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  shiftLeft: {
    marginLeft: -240,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easiOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
});

export default styles;
