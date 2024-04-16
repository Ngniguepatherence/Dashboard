import { Helmet } from 'react-helmet-async';
import { filter, size } from 'lodash';
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
  { id: 'model', label: 'Model & Color', alignRight: false },
  { id: 'plate_number', label: 'Plate Number', alignRight: false },
  { id: 'owner', label: 'Owner', alignRight: false },
  { id: 'entry_time', label: 'Entry Time', alignRight: false },
  { id: 'exit_time', label: 'Exit Time', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
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
    return filter(array, (_user) => _user.Model.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Vehicles() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  const [order, setOrder] = useState('asc');
  const [opened, setOpened] = useState(false);

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [owner, setOwner] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setexitTime] = useState('');
  const [action, setAction] = useState('');

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vehicle');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(plateNumber, entryTime, exitTime);

    try {
      // Envoyer les données du formulaire à l'API pour enregistrement
      await axios.post('http://localhost:5000/api/vehicle', {
        model,
        color,
        plateNumber,
        owner,
        entryTime,
        exitTime,
        action
      });

      // Réinitialiser les champs du formulaire après l'enregistrement
      setModel('');
      setColor('');
      setPlateNumber('');
      setOwner('');
      setEntryTime('');
      setexitTime('');
      setAction('');

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
        <title> Vehicles </title>
      </Helmet>
     
       
          <Grid container>
      {/* Premier bloc */}
      <Grid item xs={12} md={6} lg={4} spacing={12}> {/* Taille de la colonne pour les écrans xs à md */}
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 348,
            height: 139,
            py: 2,
            boxShadow: 0,
            paddingBottom: 8,
            textAlign: 'left',
            
            marginBottom: 4
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, fontFamily: 'Sk-Modernist' }}>
          <Box borderRadius={10}>
          <img src='/assets/images/avatars/image1.png' alt='car' />
          </Box>
        <Box>
        <Typography variant="h6" sx={{ marginTop: 2, marginLeft:3   }}>
        Total Vehicles
          </Typography>
        </Box>
        <Box>
          <CardHeader title={data.length} />
        </Box>
        
      
      </Box>
          <Typography variant="subtitle2" sx={{ marginTop: 2,marginBottom:2, marginLeft:3   }}>
            10% Increase of Total Employee
          </Typography>
        </Card>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 348,
            height: 139,
            py: 2,
            boxShadow: 0,
            paddingBottom: 8,
            textAlign: 'left',
            
            marginBottom: 4
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, fontFamily: 'Sk-Modernist' }}>
          <Box borderRadius={10}>
          <img src='/assets/images/avatars/image2.png' alt='car' />
          </Box>
        <Box>
        <Typography variant="h6" sx={{ marginTop: 2, marginLeft:3   }}>
          Total Flagged Vehicles
          </Typography>
        </Box>
        <Box>
          <CardHeader title={data.length} />
        </Box>
        
      
      </Box>
          <Typography variant="subtitle2" sx={{ marginTop: 2, marginLeft:3   }}>
            10% Increase of Total Employee
          </Typography>
        </Card>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 348,
            height: 139,
            py: 2,
            boxShadow: 0,
            paddingBottom: 8,
            textAlign: 'left',
            
            marginBottom: 4
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, fontFamily: 'Sk-Modernist' }}>
          <Box borderRadius={10}>
          <img src='/assets/images/avatars/image3.png' alt='car' />
          </Box>
        <Box>
        <Typography variant="h6" sx={{ marginTop: 2, marginLeft:3   }}>
        Daily Average Vehicles
          </Typography>
        </Box>
        <Box>
          <CardHeader title={data.length} />
        </Box>
        
      
      </Box>
          <Typography variant="subtitle2" sx={{ marginTop: 2, marginLeft:3   }}>
            10% Increase of Total Employee
          </Typography>
        </Card>
      </Grid>

      {/* Deuxième bloc */}
      <Grid item xs={7} md={6}> {/* Taille de la colonne pour les écrans xs à md */}
        <AppConversionRates
          title="Entry Statistics"
          subheader="(+43%) than last year"
          chartData={[
            { label: 'Monday', value: 100 },
            { label: 'Tuesday', value: 200 },
            { label: 'Wed', value: 310 },
            { label: 'Thursday', value: 405 },
            { label: 'Friday', value: 220 },
            { label: 'Saturday', value: 300 },
          ]}
        />
      </Grid>
    </Grid>
      
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            All Vehicles
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
            Add New Vehicle
          </Button>
          <Dialog open={opened} onClose={handleClose}>
        <DialogTitle>Add New Vehicle</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Model" type="text" name='model' fullWidth value={model} onChange={(e) => setModel(e.target.value)}/>
            <TextField autoFocus margin="dense" label="Color" type="text" name='color' fullWidth value={color} onChange={(e) => setColor(e.target.value)}/>
            <TextField autoFocus margin="dense" label="Plate Number" type="text" name='Plate_Number' fullWidth value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}/>
            <TextField autoFocus margin="dense" label="Owner" type="text" name='Owner' fullWidth value={owner}
            onChange={(e) => setOwner(e.target.value)}/>
            <TextField autoFocus margin="dense" label="Entry Time" type="date" name='Entry_time' fullWidth value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}/>
            <TextField autoFocus margin="dense" label="Exit Time" type="date" name='Exit_time' fullWidth value={exitTime}
            onChange={(e) => setexitTime(e.target.value)}/>
            <TextField margin="dense" label="Action" type="text" select fullWidth value={action} onChange={(e) => setAction(e.target.value)}
            ><MenuItem value="flag">Flag</MenuItem>
            <MenuItem value="unflag">Unflag</MenuItem></TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Add Vehicle</Button>
          </DialogActions>
        </form>
      </Dialog>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, Model, color, plateNumber, Owner, entryTime, exitTime ,action } = row;
                    const selectedUser = selected.indexOf(Model) !== -1;

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, Model)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={Model} src={'jkk.jhg'} />
                            <Typography variant="subtitle2" noWrap>
                              {Model}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{plateNumber}</TableCell>

                        <TableCell align="left">{Owner}</TableCell>

                        <TableCell align="left">{entryTime}</TableCell>
                        <TableCell align="left">{exitTime}</TableCell>

                        <TableCell align="left">
                          <Label color={(action === 'banned' && 'error') || 'success'}>{sentenceCase(action)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
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
        </Card>
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
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
