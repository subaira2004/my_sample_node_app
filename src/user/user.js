import React from 'react';
import ReactDOM from 'react-dom';


class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users
        };

        render()
        {
            return(
                <div class="row">
                    <div class="row">
                        <input type="button" class="btn btrn-primary" value="New" />
                    </div>
                    <div class="row">
                    if(this.state.users && this.state.users.length>0)
                    {
                        <table  class="table table-default table-striped table-bordered" style='width:100%;border:1px solid;border-collapse:collapse'>
                        <tr style="background-color:#888;color:white;">
                            <th>Name</th>
                            <th>age</th>
                            <th>department</th>
                            <th>designation</th>
                            <th>Action</th>
                        </tr>  
                        this.state.users.map((user)=>
                            <tr>
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
                                    <a  href={"/users/edit/"+user.name} class="btn btn-primary" > Edit</a>&nbsp;
                                    <a href={"/users/delete/"+user.name} class="btn btn-primary"> delete</a>
                                </td>
                            </tr>
                        );
                        </table>
                    }
                    else
                    {
                        <span class="alert alert-danger">No Users to show!</span>
                    }
                    </div>
                </div>
            );
        }

    }
}

ReactDOM.render(<User users={users}/>,document.getElementById("userApp"));