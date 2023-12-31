import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FaceIcon from '@material-ui/icons/Face';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';

import { setUser } from '../store/auth';
import { SideNavBarList } from '../components/SideNavBarList'
import ToDos from '../components/ToDos'
import Appointments from '../components/Appointments'
import UsersList from '../components/UsersList';
import ToDoOV from '../components/ToDoOV'
import ApptOV from '../components/ApptOV'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    top: '80px',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 340,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const currentUserId = useSelector(state => state.auth.id);
  const apptToDoOV = useSelector(state => state.assistV.apptToDoOV);
  const usersLi = useSelector(state => state.assistV.usersLi)
  const apptLi = useSelector(state => state.assistV.apptLi)
  const toDoLi = useSelector(state => state.assistV.toDoLi)
  const dispatch = useDispatch();
  const logout = async () => {
    await fetch('/api/users/logout', {
      method: 'DELETE',
      headers: {
        'XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
      }
    });
    dispatch(setUser({}));
  }
  console.log('STATE', apptToDoOV)

  useEffect(() => {
    async function users() {
      const res = await fetch('/api/users')
      const data = await res.json();
      // console.log(data)
    }
    users();
  })

  if (!currentUserId) return <Redirect to='login'/>

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const date = new Date();
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday']
  const wDay = weekday[date.getDay()]
  const nowDate = wDay + ' ' + month + ' ' + day + ' ' + year

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
          <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="textPrimary" noWrap className={classes.title}>
            Best Life Dashboard
          </Typography>
          <button onClick={logout}>Log out</button>
          {/* <IconButton color="inherit"> */}
            {/* <Badge badgeContent={4} color="secondary"> */}
              {/* <NotificationsIcon /> */}
            {/* </Badge> */}
          {/* </IconButton> */}
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {nowDate}
              </Paper>
            </Grid>
            <Grid
              item xs={12} md={6} lg={6}
              className={clsx(!apptToDoOV && classes.menuButtonHidden )}
            >
              <Paper className={fixedHeightPaper}>
                <ApptOV />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}
              className={clsx(!apptToDoOV && classes.menuButtonHidden )}
            >
              <Paper className={fixedHeightPaper}>
                <ToDoOV />
              </Paper>
            </Grid>
            <Grid item xs={12}
              className={clsx(!usersLi && classes.menuButtonHidden )}
            >
              <Paper className={fixedHeightPaper}>
                <UsersList />
              </Paper>
            </Grid>
            <Grid item xs={12}
              className={clsx(!apptLi && classes.menuButtonHidden )}
            >
              <Paper className={fixedHeightPaper}>
                <Appointments />
              </Paper>
            </Grid>
            <Grid item xs={12}
              className={clsx(!toDoLi && classes.menuButtonHidden )}
            >
              <Paper className={fixedHeightPaper}>
                <ToDos />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon className={clsx(!open && classes.menuButtonHidden)} />
          </IconButton>
          <IconButton onClick={handleDrawerOpen}>
            <ChevronLeftIcon className={clsx(open && classes.menuButtonHidden)} />
          </IconButton>
        </div>
        <Divider />
        <List><SideNavBarList/></List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
    </div>
  );
}
