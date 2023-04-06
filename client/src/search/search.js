import { Button, Checkbox, Container, FormControlLabel, Grid, Link, Slider, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';


function Search() {

    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [searchType, setSearchType] = useState("CONCERT")

    const [selectedConcertId, setSelectedConcertId] = useState(null);
    const [selectedArtistId, setSelectedArtistId] = useState(null);

    /* DUMMY DATA */
    const columnsVenue = [
        { 
            field: 'venueName', 
            headerName: 'Venue name', 
            width: 300, 
            // renderCell: (params) => (
            //     <Link onClick={() => setSelectedConcertId(params.row.song_id)}>{params.value}{/* UPDATE THIS */}</Link> )
        },
        { 
            field: 'location', 
            headerName: 'Location',
            width: 100
        },
        { 
            field: 'totalConcert',
            headerName: 'Total Concerts',
            width: 100
        },
    ];

    const dummyVenue = [
        { id: 1, venueName: "Venue1", location: "Location1", totalConcert: 1 },
        { id: 2, venueName: "Venue2", location: "Location2", totalConcert: 2 }
    ];

    const columnsCreator = [
        { 
            field: 'creatorName', 
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

    const dummyCreator = [
        { id: 1, creatorName: "Name1", popularity: "Popularity1", performances: 3 },
        { id: 2, creatorName: "Name2", popularity: "Popularity2", performances: 4 }
    ];
    /* DUMMY DATA */

    const handleSearchTypeChange = (event, newSearchType) => {
        setSearchType(newSearchType);
        if (newSearchType === "CONCERT") {
            setData(dummyVenue);
            setColumns(columnsVenue);
        } else {
            setData(dummyCreator);
            setColumns(columnsCreator);
        }
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
                        columns={columns}
                        // pageSize={pageSize}
                        rowsPerPageOptions={[5, 10, 25]}
                        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        autoHeight
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default Search;
