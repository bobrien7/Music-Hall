import { Button, Checkbox, Container, FormControlLabel, Grid, Link, Slider, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';


function Search() {

    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const [searchType, setSearchType] = useState("CONCERT")

    const [selectedConcertId, setSelectedConcertId] = useState(null);
    const [selectedArtistId, setSelectedArtistId] = useState(null);

    const columnsConcert = [
        { 
            field: 'name', 
            headerName: 'Venue name', 
            width: 300, renderCell: (params) => (
                <Link onClick={() => setSelectedConcertId(params.row.song_id)}>{params.value}{/* UPDATE THIS */}</Link> 
        )},
        { 
            field: 'location', 
            headerName: 'Location',
            width: 100
        },
        { 
            field: 'concert',
            headerName: 'Total Concerts',
            width: 100
        },
    ];

    const columnsCreator = [
        { 
            field: 'name', 
            headerName: 'Creator name', 
            width: 300, renderCell: (params) => (
                <Link onClick={() => setSelectedArtistId(params.row.song_id)}>{params.value}{/* UPDATE THIS */}</Link>
        )},
        { 
            field: 'popularity', 
            headerName: 'Popularity',
            width: 100
        },
        { 
            field: 'performances',
            headerName: 'Concert(s) Performed',
            width: 100
        },
    ];

    const handleSearchTypeChange = (event, newSearchType) => {
        setSearchType(newSearchType);
        console.log(newSearchType);
    }

    return (
        <div>
            
            <Grid 
                container
                rowSpacing={2}
            >
                <Grid item xs={12}>
                    <h1>Concerts & Artist Searchs</h1>
                </Grid>
                <Grid item xs={8}>
                    <TextField label="Enter text here..."/>
                </Grid>
                <Grid item xs={2}>
                    <Button>Search</Button>
                </Grid>
                <Grid item xs={2}>
                    <ToggleButtonGroup
                        value={searchType}
                        exclusive
                        onChange={handleSearchTypeChange}
                    >
                        <ToggleButton value="ARTIST">
                            <div>Artists</div>
                        </ToggleButton>
                        <ToggleButton value="CONCERT">
                            <div>Concerts</div>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12}>
                    <DataGrid
                        rows={data}
                        columns={columnsConcert}
                        pageSize={pageSize}
                        rowsPerPageOptions={[5, 10, 25]}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        autoHeight
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default Search;
