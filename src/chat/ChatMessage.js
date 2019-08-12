import React from 'react'
import Moment from 'react-moment'

export default ({ name, message, time }) =>
    <p>
        <strong>{name}</strong> <em>{message} : {time} </em>
        {/*<Moment unix>{time}</Moment>*/}
    </p>