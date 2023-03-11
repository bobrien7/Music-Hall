import SongCard from '../songcard/songcard.js';
import './artist.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Artist() {
    let link = "";
    let summary = "Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié ...";
    let title = "Artist placeholder";
    let album = "";

    return (
        <div>
            <div className="top">
                <div className="text">
                    <h1>{title}</h1>
                    <p>{summary}</p>
                    <a href={link}>Read More {'>'}</a>
                </div>
                <div>
                    <SongCard />
                </div>
            </div>
            <div className="bottom">
                <h2>Albums</h2>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <div className="horizontalAccordionTitle">
                        <img className="albumAccordion" src={album}></img>
                        <div className="accordionTitle">
                            <p className="accordionMainTitle">test1</p>
                            <p className="accordionSecondTitle">test2</p>
                        </div>
                    </div>

                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

            </div>
        </div>
    );
}

export default Artist;
