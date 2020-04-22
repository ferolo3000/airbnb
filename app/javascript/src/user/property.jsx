import React from "react";


class Fruit extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      editable: false
    }
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleEdit(){
   if(this.state.editable){
      let title = this.title.value
      let city = this.city.value
      let id = this.props.fruit.id
      let fruit = {id: id, title: title, city: city}
      this.props.handleUpdate(fruit)
    }
    this.setState({
      editable: !this.state.editable
    })
  }

  render(){
    let title = this.state.editable ? <input type='text' ref={input => this.title = input} defaultValue={this.props.fruit.title}/>:<p>{this.props.fruit.title}</p>
    let city = this.state.editable ? <input type='text' ref={input => this.city = input} defaultValue={this.props.fruit.city}/>:<p>{this.props.fruit.city}</p>
    return(
      <React.Fragment>
        {title}
        {city}
        <button onClick={() => this.handleEdit()}>{this.state.editable? 'Submit' : 'Edit'}</button>

      </React.Fragment>
    )
  }
}




export default Fruit;
