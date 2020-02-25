import React, { Component } from 'react';
import EventHeader from '../eventHeader';
import AgendaPost from '../agendaPost';
import './style.css';
var moment = require('moment');

export default class extends Component {

  converDate(data){

    if(data !=''){
      var a = moment(data).format("DD MMMM YYYY") + " - " + moment(data).format("HH:mm:ss A");
      return a;
    }else{
      var a = '-';
      return a;
    }

  }

  converDateOnly(data){

    if(data !=''){
      var a = moment(data).format("HH:mm:ss A");
      return a;
    }else{
      var a = '-';
      return a;
    }

  }  



  eventList() {
    return (
      this.props.eventList.map((data, i) => (

        // console.log("agendalist",data),

        <AgendaPost

          jumBaris = {this.props.eventList.length}
          barisId = {i}
          scrolldata = {this.props.scrolldata}
          onTitleClick={()=>this.onTitleClick(data)}
          navs={this.props}

          key={data.id}
          agendaId = { data.id}
          eventId = { data.eventId}
          agendaTitle = { data.name}
          agendaTime = {this.converDateOnly(data.time) }
          agendaTimeFinished = {this.converDateOnly(data.timeFinished)}
          agendaSpeakerName = {data.speakername}
          agendaLatlong = {data.lat_long}
          agendaDescription = {data.description}
          agendaLocation = {data.location}
          agendaFileName = {data.file_title}
          agendaFilePath = {data.files}
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

        {/* <EventHeader
          date={this.props.date}
        /> */}
        {
          this.props.eventList !== undefined ?
          this.eventList() : this.noEvent()
        }
      </div>
    );
  }
}
