import './index.css'
const AppointmentItem = props => {
  const {appointmentRequest, toggleStarred} = props
  const {id, title, date, isStarred} = appointmentRequest
  const starredIcon = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onClickStarred = () => {
    toggleStarred(id)
  }
  return (
    <li className="list-container">
      <div className="container">
        <p className="main-heading">{title}</p>
        <button className="button" data-testid="star" onClick={onClickStarred}>
          <img src={starredIcon} alt="star" className="image" />
        </button>
      </div>
      <div className="ccc">
        <div>
          <p className="para">Date : {date}</p>
        </div>
      </div>
    </li>
  )
}
export default AppointmentItem
