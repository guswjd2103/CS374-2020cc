import React, { Component } from 'react';
import '../../mainscreen.css';
// import update from 'react-addons-update';
// import '../../mainscreen.css';

class EventList extends Component {

  state = {
    question: this.props.question,
    answer: this.props.answer,
    answerList: [],
    flag: false
  }

  componentDidMount() {
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@this.props.data.answer", this.props.data.answer);
    // this._getAnswerList();
  }

  _getAnswerList() {
      const myanswerList = [];
      var answerArray = this.state.answer;
      console.log("########### _getAnswerList, answerArray", answerArray);
      // numbers.map((number) => number * 2);

      answerArray.forEach(function(data, idx){
        // console.log("###########################in foreach, data", data);
          // console.log("[eventList.js] getAnswerList() this.state.answer[key].answer", this.state.answer[key].answer);
          // console.log("[eventList.js] getAnswerList() this.state.answer[key].id", this.state.answer[key].id);
          // console.log("[eventList.js] getAnswerList() this.state.answer[key]", this.state.answer[key]);
          myanswerList.push({answer: data.answer, id: data.id})
      })
      console.log("myanswerList", myanswerList);
      this.setState({
          answerList: myanswerList,
          flag: true
      })
  }

  render() {
    console.log("eventList.js, answerList", this.state.answerList);
    if (!this.state.flag) {
      this._getAnswerList();
    }
      const returnVal = (
        <div>
          <ul>
          {this.state.answerList.map(data  => (
              <div className = "eventBox">{data.answer} <span className="answerID"> by {data.id}</span></div>
          ))}
          </ul>
        </div>
      )
      // console.log("[eventList.js] this.state.answerList", this.state.answerList);
    return (
      <div>
          {this.state.flag? returnVal : null}
      </div>
    );
  }
}

export default EventList;