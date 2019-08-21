import React from 'react'

export default ({ name, message, time }) =>
    <p>
        <strong>{name}</strong> <em>{message} : {time} </em>
        {/*<Moment unix>{time}</Moment>*/}
    </p>