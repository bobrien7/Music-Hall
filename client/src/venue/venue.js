import { Button, Checkbox, Container, FormControlLabel, Grid, Link, Slider, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

const config = require('../config.json');


function Venue() {

    const [pageSize, setPageSize] = useState(10);
    const [selectedArtistId, setSelectedArtistId] = useState(null);

    const [creatorData, setCreatorData] = useState([]);
    const [creatorColumns, setCreatorColumns] = useState([]);
    const [concertData, setConcertData] = useState([]);
    const [concertColumns, setConcertColumns] = useState([]);

    const columnsCreator = [
        { 
            field: 'rank', 
            headerName: 'Rank',
            width: 100
        },
        { 
            field: 'creatorName', 
            headerName: 'Creator name', 
            width: 300, renderCell: (params) => (
                <Link onClick={() => setSelectedArtistId(params.row.song_id)}>{params.value}{/* UPDATE THIS */}</Link>
        )},
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

    /* DUMMY DATA */
    const dummyCreator = [
        { id: 1, rank: 1, creatorName: "Name1" },
        { id: 2, rank: 2, creatorName: "Name2" }
    ];
    /* DUMMY DATA */

    useEffect(() => { // Fetch artist data TODO
        // fetch(`http://${config.server_host}:${config.server_port}/random`)
        //     .then(res => res.json())
        //     .then(resJson => setSongOfTheDay(resJson));

        // Set table columns
        setCreatorColumns(columnsCreator);
        setConcertColumns(columnsConcert);

        // Set creator data
        setCreatorData(dummyCreator)

        // Default set concerts data to top ranked artist
    })

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
                    <div>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
totam rem aperiam eaque ipsa.</div>
                </Grid>
                <Grid item xs={12}>
                    <DataGrid
                        rows={creatorData}
                        columns={creatorColumns}
                        // pageSize={pageSize}
                        rowsPerPageOptions={[5, 10, 25]}
                        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        autoHeight
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* <DataGrid
                        rows={data}
                        columns={columns}
                        // pageSize={pageSize}
                        rowsPerPageOptions={[5, 10, 25]}
                        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        autoHeight
                    /> */}
                </Grid>
            </Grid>
        </div>
    );
}

export default Venue;
