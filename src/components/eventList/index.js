import React, { Component } from 'react';
import EventHeader from '../eventHeader';
import EventPost from '../eventPost';
import './style.css';
var moment = require('moment');

export default class extends Component {

  converDate(data){

    if(data !==''){
      var a = moment(data).format("DD MMMM YYYY") + " - " + moment(data).format("HH:mm:ss A");
      return a;
    }else{
      var a = '-';
      return a;
    }

  }



  eventList() {
    return (
      this.props.eventList.map((data, i) => (

        <EventPost

          jumBaris = {this.props.eventList.length}
          barisId = {i}
          scrolldata = {this.props.scrolldata}
          onTitleClick={()=>this.onTitleClick(data)}
          navs={this.props}

          key={data.id}
          eventCreated_by={data.created_by}
          // eventDate={ moment(data.eventDate).format('DD MMMM YYYY')}
          eventDate={this.converDate(data.date)}
          eventId={data.id}
          
          eventDate_created={data.date_created}
          eventDate_end={data.date_end}
          eventDate_updated={data.date_updated}
          eventDescription={data.description}
          eventImage={data.image}
          eventLat_long={data.lat_long}
          eventLocation={data.location}
          eventName={data.name}

          // eventTitle={data.eventTitle}
          // eventAddress={data.eventAddress}
          // eventDate={ moment(data.eventDate).format('DD MMMM YYYY h:mm A')}
          // eventDate={ moment(data.eventDate).format('DD MMMM YYYY')}
          // eventDateOnly={data.eventDate}
          // eventDescrip={data.eventDescrip}
          

          />
      ))
    );
  }

  noEvent() {
    return (
      <div>
        <h1>No Events</h1>
      </div>
    )
  }


  render() {

    return (
      <div>

        <EventHeader
          date={this.props.date}
        />
        {
          this.props.eventList !== undefined ?
          this.eventList() : this.noEvent()
        }
      </div>
    );
  }
}
