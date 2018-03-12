import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


const getGridRows = (users)=>{
    return ( users.map((user)=>
        <tr key={user.name}>
            <td>
                <a href={"/users/"+user.name} > {user.name}</a>
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
                <a  href={"/users/edit/"+user.name} className="btn btn-primary" > Edit</a>&nbsp;
                <a href={"/users/delete/"+user.name} className="btn btn-primary"> delete</a>
            </td>
        </tr>
        )
    )
}
const getGrid=(users)=>{
    if(users && users.length>0){
        return(
            <table  className="table table-default table-striped table-bordered" style={{width:'100%',border:'1px solid',borderCollapse:'collapse'}}>
                <thead>
                    <tr style={{backgroundColor:'#888',color:'white'}}>
                        <th>Name</th>
                        <th>age</th>
                        <th>department</th>
                        <th>designation</th>
                        <th>Action</th>
                    </tr> 
                </thead>
                <tbody> 
                    {getGridRows(users)}
                </tbody>
            </table>
        );
    }
    else
    {
      return(  <span className="alert alert-danger">No Users to show!</span>);
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
            const users = res.data;//.map(obj => obj.data);
            this.setState({ users:users });
          });
      }

    render()
    {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <input type="button" className="btn btn-primary" value="New" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">{getGrid(this.state.users)}           
                    </div>
                </div>
            </div>
        );
    }

    
}

ReactDOM.render(<User users={[]}/>,document.getElementById("userApp"));