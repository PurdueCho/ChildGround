import React from 'react';
import './Score.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import card from './asset/card.jpg';

const styles = theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

function Score ({c_quite, c_safety, c_traffic, quite, safety, traffic, result, c_name, name}) {
    let c_url = "https://www.google.com/maps/search/" + c_name;
    let url = "https://www.google.com/maps/search/" + name;
    return (
        <div className ="contaioner">
            <div className = "Upper">
                <Card className ="c_Scores">
                    <CardActionArea>
                        <a href={c_url} target="_blank"><img src = {card} alt ="Sample House" /></a>
                    </CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {c_name}
                        </Typography>
                        <Typography component="p">
                            Quite Score: {c_quite} <br /> 
                            Safety Score: {c_safety} <br /> 
                            Traffic Score: {c_traffic} <br />
                        </Typography>
                    </CardContent>
                </Card>
                <Card className ="Scores">
                    <CardActionArea>
                        <a href={url} target="_blank"><img src = {card} alt ="Sample House" /></a>
                    </CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography component="p">
                            Quite Score: {quite} <br /> 
                            Safety Score: {safety} <br /> 
                            Traffic Score: {traffic} <br />
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className = "Lower">
                <Card className="Result"> 
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Result
                        </Typography>
                        <Typography component="p">
                            {result}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className="submit_btn">
                <Button color="primary" variant="contained"><a href="http://localhost:3000/">Go Back</a></Button>
            </div>
        </div>
        
    )
}

export default withStyles(styles)(Score)