import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class UserEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode,
            show: props.show,
            onChange: props.onChange,
            formData:props.formData
        }
    }
    onsubmit() {

    }

    render() {
        return (
            <div className="modal" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.state.mode}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={() => this.onSubmit()}>
                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue="email@example.com" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-10">
                                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Save changes</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: this.props.users
        };
    }

    componentDidMount() {
        axios.get(`users/json`)
            .then(res => {
                const users = res.data;
                this.setState({ users: users });
            });
    }

    renderGridRows(users) {
        return (
            users.map(
                (user) =>
                    <tr key={user.name}>
                        <td>
                            <a href={"/users/" + user.name} > {user.name}</a>
                        </td>
                        <td>
                            {user.age}
                        </td>
                        <td>
                            {user.department}
                        </td>
                        <td>
                            {user.designation}
                        </td>
                        <td>
                            <a href={"/users/edit/" + user.name} className="btn btn-primary" > Edit</a>&nbsp;
                            <a href={"/users/delete/" + user.name} className="btn btn-primary"> delete</a>
                        </td>
                    </tr>
            )
        )
    }

    renderGrid(users) {
        if (users && users.length > 0) {
            return (
                <table className="table table-default table-striped table-bordered" style={{ width: '100%', border: '1px solid', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#888', color: 'white' }}>
                            <th>Name</th>
                            <th>age</th>
                            <th>department</th>
                            <th>designation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderGridRows(users)}
                    </tbody>
                </table>
            );
        }
        else {
            return (<span className="alert alert-danger">No Users to show!</span>);
        }
    }


    handleClick() {

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <input type="button" className="btn btn-primary" value="New" onClick={() => this.handleClick()} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">{this.renderGrid(this.state.users)}
                    </div>
                </div>
                <UserEntry />
            </div>
        );
    }


}

ReactDOM.render(<User users={[]} />, document.getElementById("userApp"));