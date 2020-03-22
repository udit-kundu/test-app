import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoidWRpdGt1bmR1IiwiYSI6ImNrNmJydXJueDExMTUzbnBrbzdwYjV4Y2EifQ.HFjkKJboT0RMMLwhhxbgbQ';

const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
var lati="22.58267";
var long="88.46286";

class Form extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
                    isLoaded:false,
                    sensid:"",
                    devid:"",
                    value:{},
                    lng: "22.58267",
                    lat: "88.46286",
                    zoom: 5
                    };
      }

        
    myChangeHandler=(event)=>{
        this.setState({[event.target.name]: event.target.value });
        //console.log(event.target.name);
    }
    
    componentDidMount=(event)=> {
/*
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
            });
        */    }
    componentWillUnmount() {
      
      //  clearTimeout(this.intervalID);
    }
    
    //componentDidUpdate(prevState) {
            // Typical usage (don't forget to compare props):
       
  //  }

    mySubmitHandler = (event) => { 
        event.preventDefault();
        this.setState({devid: event.target.devid.value });
                
        //const UUID ='1945966c40d34e21b7693f0ff7cfaa0c';
        //this.setState({[event.target.sensid]: event.target.value });
        //this.setState({[event.target.devid]: event.target.value });
        //console.log(this.state.devid);
        //console.log("hello");
        
        const apiUrl = `http://35.197.106.255:3000/api/v1.1/lastMultiple`;
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        var urlencoded = new URLSearchParams();
        urlencoded.append("sensid", `${this.state.sensid}`);
        urlencoded.append("devid", `${this.state.devid}`);
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
        };
    
        fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                value:result
            })
            lati=this.state.value.data.latitude;
            long=this.state.value.data.longitude;
            console.log(this.state.value.data.latitude);
            console.log(this.state.value.data.longitude);
        });
       // if ((this.state.lat !== prevState.lat)||(this.state.lng !== prevState.lng)) {
            this.state.lat=lati;
            this.state.lng=long;
            const map = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this.state.lng, this.state.lat],
                zoom: 12
                });
       // }
    }
    render(){
        //const {sensid,devid,value} = this.state;
        console.log(this.state.value.data);
    return(
        <div>
        <form className="form" autoComplete="on" onSubmit={this.mySubmitHandler}>
              {/*  Sensor id:
            <TextField id="standard-basic" name="sensid" onChange={this.myChangeHandler} label="Standard" variant="outlined" />
               */} Device id:
            <TextField id="standard-basic" name="devid" onChange={this.myChangeHandler} label="Standard" variant="outlined"/>
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
      </form>
      <br/><br/><br/><div ref={el => this.mapContainer = el} style={{height:"400px",width:"50%"}} />
      {/*(!this.state.isLoaded) ? <div>Loading...</div> : <div ref={el => this.mapContainer = el} style={{height:"400px",width:"50%"}} />}
        {/*<GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDDWed_DLkpg2gveboY4pzM8pjrFeSBNow' }}
          defaultCenter={this.props.center}
          center={{
                        lat: {lat},
                        lng: {long}
                        }}
          defaultZoom={defaultProps.zoom}
        >
        {/*<Marker
            lat={59.95}
            long={30.33}
            name="My Marker"
            color="blue"
        />
        </GoogleMapReact>*/}
      
      </div>
    )
    }
}

export default Form;