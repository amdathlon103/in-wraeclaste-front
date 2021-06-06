import React from 'react'

export default ({ name, message, time }) =>
    <p>
        <strong>{name}</strong> <em>{message} : {(new Date(time)).toTimeString()} </em>
        {/*<Moment unix>{time}</Moment>*/}
    </p>