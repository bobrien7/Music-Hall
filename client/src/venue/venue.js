import { Button, Checkbox, Container, FormControlLabel, Grid, Link, Slider, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';


function Venue() {

    const [pageSize, setPageSize] = useState(10);

    const [artistData, setArtistData] = useState([]);
    const [artistColumns, setArtistColumns] = useState([]);
    const [concertData, setConcertData] = useState([]);
    const [concertColumns, setConcertColumns] = useState([]);

    const [searchType, setSearchType] = useState("CONCERT")

    const [selectedArtistId, setSelectedArtistId] = useState(null);

    return (
        <div>
            <Grid 
                container
                rowSpacing={2}
            >
                <Grid item xs={12}>
                    <h1>Concerts & Artist Searchs</h1>
                </Grid>
                <Grid item xs={12}>
                    <div>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
totam rem aperiam eaque ipsa.</div>
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
