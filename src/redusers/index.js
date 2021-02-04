import { ADD_REMINDER, REMOVE_REMINDER,CLEAR_REMINDERS} from "../Types";
import {bake_cookie,read_cookie} from 'sfcookies'

const reminders =(state=[],action)=>{
    let reminders =[];
    state= read_cookie('reminders')
    if(action.type=== ADD_REMINDER){
        reminders=[...state,{text:action.text,date:action.date,id:Math.random()}]
        bake_cookie("reminders",reminders)
        console.log("frome reducer",reminders)
        return reminders 
    }
    else if(action.type===REMOVE_REMINDER){
        bake_cookie("reminders",reminders)
        reminders=state.filter(reminder=>reminder.id!== action.id)
        return reminders
    }
    else if(action.type === CLEAR_REMINDERS){
        reminders=[]
        bake_cookie("reminders",reminders)
        return reminders
    }
    else{
        return state
    }
}
export default reminders