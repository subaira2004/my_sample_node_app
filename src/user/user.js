import React from 'react';
import ReactDOM from 'react-dom';
import Pager from "../pager/pager.js";
import axios from 'axios';

class AjaxLoader extends React.Component {
    render() {
        return (
            <div className={"ajax-loader" + (this.props.show ? " show" : " hide")}>
                <img src="images/ajax-loader.gif" className="ajax-loader-img" />
            </div>
        );
    }
}

class UserEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: props.data.key,
            mode: props.data.mode,
            show: props.data.show,
            formData: props.data.formData
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    onSubmit(e) {
        this.curSubmiturl = this.state.key == '' ? '/users/new/ajax' : ('/users/edit/:' + this.state.key + '/ajax');
        this.props.onShowLoader(() => {
            axios.post(this.curSubmiturl, this.state.formData).then(res => {
                if (res.data.success) {
                    this.resetModalData();
                    this.props.onChange(true);
                }
            });
        });
        e.preventDefault();
    }

    onClose(e) {
        this.resetModalData();
        this.props.onChange(false);
        e.preventDefault();
    }

    resetModalData() {
        this.setState({
            formData: { name: '', age: '', designation: '', department: '' }
        });
    }

    handleChange(e) {
        const elem = e.target;

        this.setState((prevState, prop) => {
            const curFormData = prevState.formData;
            curFormData[elem.name] = elem.value;
            this.props.data.formData = curFormData;
            return {
                formData: curFormData
            }
        });
        e.preventDefault();
    }

    renderName() {
        if (this.props.data.key == '')
            return (<input type="text" className="form-control-plaintext" name="name" id="name" value={this.props.data.formData.name} onChange={this.handleChange} />);
        else
            return (<input type="text" className="form-control-plaintext" name="name" id="name" value={this.props.data.formData.name} readOnly={true} />);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            key: nextProps.data.key,
            formData: nextProps.data.formData,
            show: nextProps.data.show,
            mode: nextProps.data.mode,
        });
    }

    render() {
        return (
            <div className={"modal show slider " + (this.props.data.show ? "slider-up" : "slider-down")} tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.data.mode}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onClose}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        {this.renderName()}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="age" className="col-sm-2 col-form-label">Age</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control-plaintext" name="age" id="age" value={this.props.data.formData.age} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="department" className="col-sm-2 col-form-label">Department</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control-plaintext" name="department" id="department" value={this.props.data.formData.department} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="designation" className="col-sm-2 col-form-label">Designation</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control-plaintext" name="designation" id="designation" value={this.props.data.formData.designation} onChange={this.handleChange} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.onSubmit}>{(this.props.data.key == "" ? "Save" : "Update")}</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onClose}>Close</button>
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
            showLoader: false,
            users: this.props.users,
            modalDataKey: '',
            onModalChange: this.onModalChange,
            showModal: false,
            modalMode: '',
            modalData: { name: '', age: '', designation: '', department: '' },
            pager: {
                currentPage: 1,
                records: 0,
                pageSize: 10
            }
        };
        this.newClick = this.newClick.bind(this);
        this.onModalChange = this.onModalChange.bind(this);
        this.getData = this.getData.bind(this);
        this.resetModalData = this.resetModalData.bind(this);
    }

    getData() {
        this.setState({ showLoader: true }, () => {
            axios.get(`users/json?currentPage=` + this.state.pager.currentPage + '&pageSize=' + this.state.pager.pageSize)
                .then(res => {
                    const users = res.data.users;
                    const pagerNew = { currentPage: res.data.currentPage, pageSize: res.data.pageSize, records: res.data.records }
                    this.setState({ users: users, showLoader: false });
                });
        });
    }

    showLoader(callback) {
        if (callback)
            this.setState({ showLoader: true }, callback);
        else
            this.setState({ showLoader: true });
    }

    componentWillMount() {
        this.getData()
    }

    onModalChange(isChanged) {
        if (isChanged) {
            this.getData();
        }
        this.resetModalData();
    }
    resetModalData() {
        this.setState({
            modalDataKey: '',
            showModal: false,
            modalMode: '',
            modalData: { name: '', age: '', designation: '', department: '' }
        });
    }

    newClick(e) {
        this.setState({ showModal: true, modalMode: "New", modalDataKey: '', modalData: { name: '', age: '', designation: '', department: '' } });
    }

    editUser(e) {
        this.editUserName = e.target.attributes.data.value;
        this.showLoader(() => {
            const userName = this.editUserName;
            const url = 'users/' + userName + '/ajax';

            axios.get(url)
                .then(res => {
                    if (res.data) {
                        const userData = res.data;
                        this.setState({ showLoader: false, showModal: true, modalMode: "Edit", modalDataKey: userData.name, modalData: userData });
                    }
                });
        });
    }

    deleteUser(e) {
        this.delUserName = e.target.attributes.data.value;
        this.delUrl = 'users/delete/' + this.delUserName + '/ajax';
        if (confirm('Are you sure want to Delete ' + this.delUserName + '?')) {
            this.showLoader(() => {
                axios.get(this.delUrl)
                    .then(res => {
                        if (res.data.success) {
                            this.getData();
                        }
                    });
            });
        }
    }

    onPagerPaging(goToPage) {
        this.goToPage = goToPage;
        this.setState((prevSate, props) => {
            const pagerNew = prevSate.pager;
            pagerNew.currentPage = this.goToPage;
            return {
                pager: pagerNew
            }
        },
            this.getData()
        )
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
                            <a data={user.name} onClick={this.editUser.bind(this)} className="btn btn-primary" > Edit</a>&nbsp;
                            <a data={user.name} onClick={this.deleteUser.bind(this)} className="btn btn-primary"> delete</a>
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


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <input type="button" className="btn btn-primary" value="New" onClick={this.newClick} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">{this.renderGrid(this.state.users)}
                    </div>
                </div>
                <Pager record={this.state.pager.records} pageSize={this.state.pager.pageSize} currentPage={this.state.pager.currentPage} onPaging={this.onPagerPaging.bind(this)} />
                <UserEntry onShowLoader={this.showLoader.bind(this)} onChange={this.state.onModalChange.bind(this)} data={{ key: this.state.modalDataKey, show: this.state.showModal, mode: this.state.modalMode, formData: this.state.modalData }} />
                <AjaxLoader show={this.state.showLoader} />
            </div>
        );
    }


}

ReactDOM.render(<User users={[]} />, document.getElementById("userApp"));