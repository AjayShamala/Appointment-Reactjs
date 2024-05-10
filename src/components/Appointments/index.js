import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'
class Appointments extends Component {
  state = {titleInput: '', dateInput: '', appointmentList: [], isActive: false}
  toggleStarred = id => {
    this.setState(previous => ({
      appointmentList: previous.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }
  filterActive = () => {
    const {isActive} = this.state
    this.setState({isActive: !isActive})
  }
  onChangetitleInput = event => {
    this.setState({titleInput: event.target.value})
  }
  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }
  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const dateAppointment = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      name: titleInput,
      date: dateAppointment,
      isStarred: false,
    }
    this.setState(previous => ({
      appointmentList: [...previous.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }
  getFilterActive = () => {
    const {isActive, appointmentList} = this.state
    if (isActive) {
      return appointmentList.filter(each => each.isStarred === true)
    }
    return appointmentList
  }
  render() {
    const {titleInput, dateInput, isActive} = this.state
    const filteredAppoint = this.getFilterActive()
    const buttonMaker = isActive ? 'buttona-maker' : 'buttona'
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="containerss">
            <div>
              <h1 className="main-heading">Add Appointment</h1>
              <form className="form-container" onSubmit={this.onAddAppointment}>
                <label htmlFor="titleid" className="label-container">
                  TITLE
                </label>
                <input
                  type="text"
                  id="titleid"
                  className="input-container"
                  value={titleInput}
                  onChange={this.onChangetitleInput}
                />
                <label htmlFor="labelid" className="label-container">
                  DATE
                </label>
                <input
                  type="date"
                  id="labelid"
                  className="input-container"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                />
                <div>
                  <button type="submit" className="button-container">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image-4"
            />
          </div>
          <hr className="horizontal-container" />
          <div className="containers">
            <div>
              <h1 className="head">Appointments</h1>
            </div>
            <div>
              <button className={buttonMaker} onClick={this.filterActive}>
                Starred
              </button>
            </div>
          </div>
          <ul className="unorder-list">
            {filteredAppoint.map(each => (
              <AppointmentItem
                key={each.id}
                appointmentRequest={each}
                toggleStarred={this.toggleStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
