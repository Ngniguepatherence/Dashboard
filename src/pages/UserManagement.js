import { Helmet } from 'react-helmet-async';
import { filter, set, size } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { alpha, styled } from '@mui/material/styles';
// @mui
import { CarOutlined } from '@ant-design/icons';
import axios from 'axios';

import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Box,CardHeader, FormControl, InputLabel, Select,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  Grid,
  CardContent,
  CardActions,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { AppConversionRates, AppWidgetSummary } from '../sections/@dashboard/app';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { fShortenNumber } from '../utils/formatNumber';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name & ID', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'purpose', label: 'Purpose', alignRight: false },
  { id: 'time', label: 'Time Visited', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserMangement() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');
  const [opened, setOpened] = useState(false);
  const [openet, setOpenet] = useState(false);

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');
  const [data, setData] = useState([]);
  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const [phone, setPhone] = useState('');


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);

  };

  // const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpened(true);
  };
  const handleClickOpened = () => {
    setOpenet(true);
  };

  const handleClose = () => {
    setOpened(false);
  };
  const handleClosed = () => {
    setOpenet(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      // try {
        const response = await axios.get('http://localhost:5000/api/companies');
        setData(response.data);
        console.log(response);
      // } catch (error) {
      //   console.error('Error fetching users:', error);
      // }
    };

    fetchData();
  }, []);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]; // Récupérer le premier fichier sélectionné
    console.log('Selected file:', file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyer les données du formulaire à l'API pour enregistrement
      await axios.post('http://localhost:5000/api/companies', {
        name,
        email,
        password
        
      });

      // Réinitialiser les champs du formulaire après l'enregistrement
      setName('');
      setEmail('');
      setPassword('');
      setDescription('');
      setAddress('');
      setPhone('');
    

      // Fermer la boîte de dialogue après l'enregistrement
      handleClose();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du visiteur :', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;


  return (
    <>
      <Helmet>
        <title> Companies </title>
      </Helmet>
       
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Manage Companies
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
            New Company
          </Button>
          <Dialog open={opened} onClose={handleClose}>
        <DialogTitle>Creater</DialogTitle>
        <form onSubmit={handleSubmit}>
        <DialogContent>
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        autoFocus
        margin="dense"
        label="Enter Company Name"
        type="text"
        fullWidth
        placeholder="Enter Company Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        autoFocus
        margin="dense"
        label="Enter Company Email"
        type="email"
        fullWidth
        placeholder="Enter Company Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        autoFocus
        margin="dense"
        label="Company Address"
        type="text"
        fullWidth
        placeholder="Enter Company Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        autoFocus
        margin="dense"
        label="Company Phone"
        type="tel"
        fullWidth
        placeholder="Enter Company Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </Grid>
  </Grid>
  <Grid item xs={12}>
      <TextField
        autoFocus
        margin="dense"
        label="Password"
        type="password"
        fullWidth
        placeholder="Enter Company Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </Grid>
</DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Add Visitor</Button>
          </DialogActions>
        </form>
      </Dialog>
        </Stack>

        <Scrollbar>
  <Grid container spacing={2}>
    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
      const { _id, name, email } = row;
      const selectedUser = selected.indexOf(name) !== -1;

      return (
        <Grid item key={_id} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ marginBottom: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar alt={name} src={'avatarUrl'} />
                <Typography variant="subtitle2" noWrap>
                  {name}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Email: {email}
              </Typography>
              
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                <Iconify icon={'eva:more-vertical-fill'} />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      );
    })}
  </Grid>
  {isNotFound && (
    <Paper sx={{ textAlign: 'center', marginTop: 2 }}>
      <Typography variant="h6" paragraph>
        Not found
      </Typography>
      <Typography variant="body2">
        No results found for <strong>&quot;{filterName}&quot;</strong>.<br /> Try checking for typos or using complete words.
      </Typography>
    </Paper>
  )}
</Scrollbar>

<TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={USERLIST.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>


<TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={USERLIST.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>

      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem  onClick={handleClickOpened}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>


        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Data</DialogTitle>
        {/* <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={editedData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={editedData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={editedData.password}
            onChange={handleChange}
          />
        </DialogContent> */}
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions> */}
      </Dialog>

    </>
  );
}


const EditFormDialog = ({ open, handleClose, formData, handleUpdate }) => {
  const [editedData, setEditedData] = useState({ ...formData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSubmit = () => {
    handleUpdate(editedData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="edit-form-dialog">
      <DialogTitle>Edit Form</DialogTitle>
      

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
