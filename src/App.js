
import React, { Component } from 'react'
import DataPicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

import {add_Reminder,remove_Reminder,clear_Reminder} from './Actions'
import {connect} from 'react-redux';
import moment from 'moment'
class App extends Component {
  state ={
    text: '',
    date: new Date()
  }
  render_Reminders=()=>{
    const {reminders}=this.props;
    return(
      <ul className="list-group">
        {
         reminders.map(reminder=>{
          return(
             <li  key={reminder.id}className='list-group-item'>
                 <div>{reminder.text}</div>
                 <div>{moment(new Date(reminder.date)).fromNow()}</div>
                 <div className="closeIcon btn btn-danger" onClick={()=>this.props.remove_Reminder(reminder.id)}>X</div>
    
             </li>
            )
        }) 
        }

      </ul>
     )
    
    
  }
  render() {
    return (
      <div className="App">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5efqwi6uqPW98zPQANi8V4DE5tCKsdIw5tA&usqp=CAU"/>
          <div className="reminder-title">
               <h2>What should U Do ?</h2>
          </div>
        <input
               className="form-control"
               type="text"
               value={this.state.text}
               placeholder="Enter what U think ... ?"
               onChange={(e)=>this.setState({text:e.target.value})}
               
        />   
        <DataPicker
        className="form-control"
        placeholderText="Enter Date"
        value={this.state.date}
        selected={this.state.date}
        onChange={(date)=>{this.setState({date:date})}}
        showTimeSelect
        timeFormat="HH:mm"
        dateFormat= "d MMMM, yyyy h:mm aa"
        timeCaption="time"
        />
        <button 
          onClick={()=>{
            if(this.state.text&&this.state.date){
            this.props.add_Reminder(this.state.text,this.state.date)
            this.setState({text:"",date:""})}
            else{
              alert("please write task")
            }      
          }}
            className="btn btn-primary btn-block">
            Add Reminder
        </button>
        {this.render_Reminders()}
  
        <button
          onClick={
            ()=>this.props.clear_Reminder()} 
          className="btn btn-danger btn-block">
          Clear Reminders
        </button>
  
     
      </div>
    );
  }
}
export default connect(state=>{
  return{
    reminders:state
  }
},{
  add_Reminder,
  remove_Reminder,
  clear_Reminder

}

)(App)

