import React, { Component, Fragment } from 'react';
import { Coworker, Record, Event, EventInputForm, NotificationManager } from '..';
import '../../mainscreen.css';
import { Todo } from '../../routes';
import Switch from 'react-switch';
import { Notification } from '..';
import Select from 'react-select'
import { Segment } from 'semantic-ui-react';

var timerId;

const options = [
	{ value: '0.1', label: '6s' },
  ];

class Mainscreen extends Component {
	constructor(props){
		super(props)
		this.state = {
			data : this.props.data,
			currentTab : "Todo",
			noti_time : 0.1,
			noti_flag: false,
			noti_title : "",
			noti_page : "",
			alarm_flag : false,		
			noti_change : 0	,
			selected : ""
		}
		this.notiChange = this.notiChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	
	handleTimer = (value) => {
		console.log(value)
		timerId = setInterval(() => {
            this.setState({
                noti_flag : true,
                noti_title : "Mark the progress😀",
				noti_page : 'http://localhost:3000/CS374-2020cc/Odot/',
				noti_time : value
			})
			this.setState({
				noti_flag : false
			})
            }, 1000*60*value)
	}

	componentDidMount(){
		this.handleTimer(this.state.noti_time);
	}

	shouldComponentUpdate(nextProps,nextState){

		return true;
	}

	componentDidUpdate(prevProps,prevState){
		if (prevState.noti_time !== this.state.noti_time){
			this.setState({
				noti_time : this.state.noti_time
			})
		}
	}

	handleDaily = () => {
		this.setState({
			currentTab : "Todo"
		})
	}

	handleEvent = () => {
		this.setState({
			currentTab : "Event"
		})
	}

	handleRecord = () => {
		this.setState({
			currentTab : "Record"
		})
	}

	handleEventInput = () => {
		this.setState({
			currentTab : "EventInput"
		})
	}

	handleSetting = () => {
		this.setState({
			currentTab : "Setting"
		})
	}

	notiChange = (selectedOption) => {
		clearInterval(timerId);
		this.handleTimer(selectedOption.value);
		this.setState({
			noti_time: selectedOption.value,
			selected : selectedOption
		})
	}

	handleChange = (checked) => {
		this.setState({
			 alarm_flag : checked
		});
	}

	handleProfile = () => {
		this.props.coworkerHandler({
			id : this.props.loginID
		});
	}
	render() {

		if(this.props.data !== this.state.data){
			this.setState({
    			data: this.props.data
    		})
		}

		var dailyScheduler = (
            <div>
                <Todo currentTab="Todo" data={this.state.data} noti_time ={this.state.noti_time} loginID={this.props.loginID} isCoworker={this.props.isCoworker}/>
            </div>
        );
        let eventScheduler = (
            <div>
                <Event currentTab="Event" data={this.state.data}/>
            </div>
        );
        let recordScheduler = (
            <div>
                <Record currentTab="Record" data={this.state.data}/>
            </div>
		);

		let eventInput = (
			<div>
				<EventInputForm currentTab="EventInput" onhandleEvent = {this.handleEvent}/>
			</div>
		);

		let ShowProfile = (
			<div className="ShowProfileAlign">
				<div className="ShowProfilePhoto">
					<div className="ShoeProfileTextMe">
						Me
					</div>
				</div>
				<div className="ShowProfile">
					{this.props.loginID}
					<br/>
					{this.props.loginName}
					<br/>
					developer
				</div>
			</div>
		) 
		


    return (
    	<div className="app">
    		<div>
	     	<div className="sidebar">
	     		<div className="logo" onClick={this.handleProfile}></div>
	     		<div className={this.state.currentTab === "Todo" ? 'clickedButton':'idleButton'}  onClick={this.handleDaily}>Todo</div>
	     		<div className={this.state.currentTab === "Event" ? 'clickedButton':'idleButton'}  onClick={this.handleEvent}>Event</div>
				<div className = "profileDiv" onClick={this.handleProfile}>{ShowProfile}</div>
	     		{/* <div className={this.state.currentTab === "Record" ? 'clickedButton':'idleButton'}  onClick={this.handleRecord}>Record</div> */}
	     		{/* <div className={this.state.currentTab === "EventInput" ? 'clickedButton':'idleButton'}  onClick={this.handleEventInput}>EventInput</div> */}
				<div className = "for_test">For easy prototype testing, <br></br> we only allow interval to '6s'</div>
	     		<div className="alarm">
					<div className="alarm_icon2"></div>
					<div style = {{width:'90px', marginLeft:'5px', marginRight:'10px', color:'black'}} > 
					<div className="select-up">
					<Select  id = "container_2" placeholder = "Time" value={this.state.selected} isDisabled={!this.state.alarm_flag} onChange={this.notiChange} options={options} /> 	
					</div>
					</div>
                    <Switch
						checked={this.state.alarm_flag}
						onChange={this.handleChange}
						uncheckedIcon = {false}
						checkedIcon = {false}
						offColor = '#888'
						onColor = '#F67E7D'
						height = {20}
						width = {40}
					/>
                </div>
	     		{/* <div className="setting" onClick={this.handleSetting}></div> */}
	        </div>
	        </div> 
	     	<div className="content">
				{this.state.currentTab === "Record" ? recordScheduler : 
				(this.state.currentTab === "Event" ? eventScheduler : dailyScheduler)}
				{/* (this.state.currentTab === "EventInput" ? eventInput : dailyScheduler))} */}
				<NotificationManager data={this.state.data}/>
	        </div>
			<div id = "container1">
			{this.state.currentTab === "Todo" ? 
					<Coworker handler={this.props.coworkerHandler} data={this.state.data}/>
					: null}
			</div>
			<div>
                {this.state.noti_flag&&this.state.alarm_flag ?
					<Notification 
						noti_title={this.state.noti_title} 
						noti_page={"http://localhost:3000/CS374-2020cc/Odot/"} 
						noti_change={this.state.noti_change}
						data = {this.props.data}/>
                :(  
                    null
                )}
            </div>
   		</div>
    );
  }
}

export default Mainscreen;