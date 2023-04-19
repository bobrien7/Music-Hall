import { Grid, Link } from '@mui/material';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { NavLink } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
const config = require('../config.json');


function Venue() {

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [creatorData, setCreatorData] = useState([]);
    const [concertData, setConcertData] = useState([]);

    const columnsCreator = [
        { 
            field: 'creator_name', 
            headerName: 'Creator name', 
            width: 300,
            renderCell: (row) => (<NavLink to={`/artist/${row.creator_id}`}>{row.creator_name}</NavLink>)
        },
        { 
            field: 'creator_popularity', 
            headerName: 'Popularity', 
            width: 300
        },
        { 
            field: 'count_of_concerts', 
            headerName: 'Total Concerts', 
            width: 300
        }
    ];

    const columnsConcert = [
        {
            field: 'concertName', 
            headerName: 'Concert Name',
            width: 100
        },
        {
            field: 'concertDate', 
            headerName: 'Date',
            width: 100
        }
    ]

    const handleChangePage = (e, newPage) => {
        return; // TODO
    }

    const handleChangePageSize = (e) => {
        setPageSize(e.target.value);
        setPage(1);
    }

    useEffect(() => {
        const venue_id = document.URL.split("/").pop();
        // fetch(`http://${config.server_host}:${config.server_port}/venuetopcreator/${venue_id}`)
        //     .then(res => res.json())
        //     .then(resJson => setCreatorData(resJson));
        // console.log(creatorData);

        // fetch(`http://${config.server_host}:${config.server_port}/recentconcert/${venue_id}`)
        //     .then(res => res.json())
        //     .then(resJson => setConcertData(resJson));
        // console.log(concertData);
    })

    const defaultRenderCell = (col, row) => {
        return <div>
            {row[col.field]}
        </div>;
    }

    return (
        <div>
            <Grid 
                container
                rowSpacing={2}
            >
                <Grid item xs={12}>
                    <h1>Venue</h1>
                </Grid>
                <Grid item xs={12}>
                    <h3>Top Creators</h3>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead> {/* Top most popular artists */}
                                <TableRow>
                                    {columnsCreator.map(col => 
                                        <TableCell 
                                            key={col.headerName}
                                            sx={{
                                                color: "white",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {col.headerName}
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {creatorData.map((row, idx) =>
                                    <TableRow key={idx}>
                                    {
                                        columnsCreator.map(col => 
                                            <TableCell 
                                                key={col.headerName}
                                                sx={{
                                                    color: "white"
                                                }}
                                            >
                                                {col.renderCell ? col.renderCell(row) : defaultRenderCell(col, row)}
                                            </TableCell>
                                    )}
                                    </TableRow>
                                )}
                            </TableBody>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={-1}
                                rowsPerPage={pageSize}
                                page={page - 1}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangePageSize}
                            />
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <h3>Most Recent Concerts</h3>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead> {/* Most recent concerts */}
                                <TableRow>
                                    {columnsConcert.map(col => 
                                        <TableCell 
                                            key={col.headerName}
                                            sx={{
                                                color: "white",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {col.headerName}
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {concertData.map((row, idx) =>
                                    <TableRow key={idx}>
                                    {
                                        columnsConcert.map(col => 
                                            <TableCell 
                                                key={col.headerName}
                                                sx={{
                                                    color: "white"
                                                }}
                                            >
                                                {col.renderCell ? col.renderCell(row) : defaultRenderCell(col, row)}
                                            </TableCell>
                                    )}
                                    </TableRow>
                                )}
                            </TableBody>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={-1}
                                rowsPerPage={pageSize}
                                page={page - 1}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangePageSize}
                            />
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}

export default Venue;
