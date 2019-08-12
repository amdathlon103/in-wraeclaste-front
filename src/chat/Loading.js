import React from 'react';
// import TopLine from "../views/TopLine";

export default class NoAccess extends React.Component {
    render() {
        return (
            <div>
                {/*<TopLine cookies={this.props.cookies}/>*/}
                <div className="row">
                    <div className="col-md-6 ml-3">
                        <h1>Loading!</h1>
                    </div>
                </div>
            </div>
        )
    }
}