import React, { useState, useMemo } from "react";
import {
  TextField,
  MenuItem,
  Select,
  Button,
  FormControl,
  Box,
  AppBar,
  Typography,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { contractStatus } from "./mockData"; // Assuming this is imported from some mock data

const ContractList = ({ contracts, onEditContract, onAddContract }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle status filter change
  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  // Handle sorting change
  const handleSortChange = (event) => {
    const [key, direction] = event.target.value.split("_"); // Format: 'key_direction'
    setSortConfig({ key, direction });
  };

  const filteredAndSortedContracts = useMemo(() => {
    let filteredContracts = contracts;
    if (searchQuery) {
      filteredContracts = filteredContracts.filter(
        (contract) =>
          contract.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contract.clientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Filter by status
    if (filterStatus) {
      filteredContracts = filteredContracts.filter(
        (contract) => contract.status === filterStatus
      );
    }
    // Sort by
    filteredContracts.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return filteredContracts;
  }, [contracts, searchQuery, filterStatus, sortConfig]);

  return (
    <div>
      <AppBar component="nav" style={{ marginBottom: "20px" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Contract Management Dashboard
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button onClick={onAddContract} sx={{ color: "#fff" }}>
              Generate New Contract
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <div style={{ margin: "100px 20px 20px 20px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid size={4}>
              <InputLabel htmlFor="search">Search</InputLabel>
              <TextField
                id="search"
                placeholder="Search by ID or Client"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid size={4}>
              <InputLabel htmlFor="filter">Filter</InputLabel>
              <FormControl fullWidth>
                <Select
                  id="filter"
                  value={filterStatus}
                  onChange={handleFilterChange}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>All Status</em>
                  </MenuItem>
                  {contractStatus.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={4}>
              <InputLabel htmlFor="sort">Sort By</InputLabel>
              <FormControl fullWidth>
                <Select
                  id="sort"
                  value={`${sortConfig.key}_${sortConfig.direction}`} // Format: key_direction
                  onChange={handleSortChange}
                >
                  <MenuItem value="id_asc">ID (Ascending)</MenuItem>
                  <MenuItem value="id_desc">ID (Descending)</MenuItem>
                  <MenuItem value="clientName_asc">
                    {" "}
                    Client Name (Ascending)
                  </MenuItem>
                  <MenuItem value="clientName_desc">
                    {" "}
                    Client Name (Descending)
                  </MenuItem>
                  <MenuItem value="status_asc">Status (Ascending)</MenuItem>
                  <MenuItem value="status_desc">Status (Descending)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="contract list table">
          <TableHead>
            <TableRow>
              <TableCell>Contract ID</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell>{contract.id}</TableCell>
                <TableCell>{contract.clientName}</TableCell>
                <TableCell>{contract.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => onEditContract(contract)}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContractList;
