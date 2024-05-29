import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DashboardRounded, Settings, AccountCircle } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, LinearProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedElement, setSelectedElement] = React.useState(null);
  const [formValues, setFormValues] = React.useState({ name: '', status: '' ,server:''});
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleCardClick = (element) => {
    setSelectedElement(element);
    setFormValues(element); // Initialize form values
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Update the docker element with the new values (implement the logic as needed)
    console.log('Updated values:', formValues);
    setDialogOpen(false);
  };

  const dockerElements = [
    { name: 'PostgreSQL', status: 'Running',server:"server2" },
    { name: 'OpenSearch', status: 'Running',server:"server1" },
    { name: 'FusionAuth', status: 'Stopped',server:"server2" },
    { name: 'PostgreSQL', status: 'Running',server:"server3" },
    { name: 'OpenSearch', status: 'Running',server:"server2" },
    { name: 'FusionAuth', status: 'Stopped',server:"server2" },
    // Add more elements as needed
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Running':
        return '#25BE68';
      case 'Stopped':
        return 'red';
      case 'Restarting':
        return 'yellow';
      default:
        return 'grey';
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: "#25BEA3" }} elevation={0} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Profile', 'Settings'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleNavigation(index === 0 ? '/dashboard' : index === 1 ? '/profile' : '/settings')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 0 ? <DashboardRounded /> : index === 1 ? <AccountCircle /> : <Settings />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Grid container spacing={3}>
          {dockerElements.map((element, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ backgroundColor: getStatusColor(element.status) }} onClick={() => handleCardClick(element)}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {element.name}
                  </Typography>
                  <Typography color="text.secondary">
                    Status: {element.status}
                  </Typography>
                </CardContent>
                <LinearProgress variant='indeterminate' />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ marginTop: "100px", marginBottom: "100px" }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={2} md={4} lg>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'Running Containers' },
                    { id: 1, value: 15, label: 'Failed Containers' },
                    { id: 2, value: 20, label: 'Restarting Containers' },
                  ],
                },
              ]}
              title='Docker Containers Status'
              height={400}
            />
          </Grid>
          <Grid item xs={12} sm={2} md={4} lg>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'USED Memory' },
                    { id: 1, value: 15, label: 'Free Memory' },
                  ],
                },
              ]}
              height={400}
            />
          </Grid>
          <Grid item xs={12} sm={2} md={4} lg>
            <PieChart
              series={[
                {
                  data: [
                    { id: 1, value: 15, label: 'CPU Used' },
                    { id: 2, value: 100, label: 'CPU Capacity' },
                  ],
                },
              ]}
              height={400}
            />
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: "100px", marginBottom: "100px" }} />
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{selectedElement?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the details of the selected docker element.
          </DialogContentText>
          <Box component="form" onSubmit={handleFormSubmit}>
            <TextField
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Status"
              type="text"
              fullWidth
              name="status"
              value={formValues.status}
              onChange={handleInputChange}
            />
              <TextField
              margin="dense"
              label="Server Name"
              type="text"
              fullWidth
              name="server"
              value={formValues.server}
              onChange={handleInputChange}
            />
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default function App() {
  return (
    <Dashboard />
  );
}
