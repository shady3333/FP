import React, {Component} from 'react';
import { signup } from '../auth';

export class SignUp extends Component{

  constructor(){
    super()
    this.state={
      name:"",
      email:"",
      password:"",
      error:""
    }
  }
  handleChange = (name) => (event) =>{
    this.setState({error: ""});
    this.setState({ [name]: event.target.value});
  };
  clickSubmit = (event) =>{
    event.preventDefault()
    const {name,email,password} = this.state
    const user ={
      name,
      email,
      password,
      open:false
    };
    //console.log(user);
    signup(user)
    .then(data =>{
      if(data.error) this.setState({error: data.error})
        else this.setState({
          error: "",
          name: "",
          email:"",
          password:"",
          open:true
        });
    })
  };

  signupForm = (name,email,password) =>(
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={this.handleChange("name")} type="text" className="form-control" value={name}/>
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}/>
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}/>
            </div>

            <button onClick={this.clickSubmit} className="mt-3 mb-5 btn.btn-raised btn-success">SUBMIT</button>
    </form>
  )

  render(){
    const{name,email,password,error,open} = this.state
    return(
      <div className="container">
      <h2 className="mt-5 mb-5">SignUp</h2>


      <div className="alert alert-danger" style={{display:error ? "" : "none" }}>
      {error}
      </div>

      <div className="alert alert-success" style={{display:open ? "" : "none" }}>
            New Account is Successfully Created.Please SignIn.
      </div>

         {this.signupForm(name,email,password)}

      </div>
    );
  }
}
export default SignUp;
