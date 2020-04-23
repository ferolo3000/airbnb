import React from "react";


class Property extends React.Component{

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
      let country = this.country.value
      let description = this.description.value
      let property_type = this.property_type.value
      let price_per_night = this.price_per_night.value
      let max_guests = this.max_guests.value
      let bedrooms = this.bedrooms.value
      let beds = this.beds.value
      let baths = this.baths.value
      let id = this.props.property.id
      let property = {id: id, title: title, city: city, country: country, description: description, property_type: property_type, price_per_night: price_per_night, max_guests: max_guests,
        bedrooms: bedrooms, beds: beds, baths: baths}
      this.props.handleUpdate(property)
    }
    this.setState({
      editable: !this.state.editable
    })
  }

  render(){
    let title = this.state.editable ? <input type='text' ref={input => this.title = input} defaultValue={this.props.property.title}/>:<li className="list-group-item">{this.props.property.title}</li>
    let description = this.state.editable ? <input type='text' ref={input => this.description = input} defaultValue={this.props.property.description}/>:<li className="list-group-item">{this.props.property.description}</li>
    let city = this.state.editable ? <input type='text' ref={input => this.city = input} defaultValue={this.props.property.city}/>:<li className="list-group-item">City: {this.props.property.city}</li>
    let country = this.state.editable ? <input type='text' ref={input => this.country = input} defaultValue={this.props.property.country}/>:<li className="list-group-item">Country: {this.props.property.country}</li>
    let property_type = this.state.editable ? <input type='text' ref={input => this.property_type = input} defaultValue={this.props.property.property_type}/>:<li className="list-group-item">Type: {this.props.property.property_type}</li>
    let price_per_night = this.state.editable ? <input type='text' ref={input => this.price_per_night = input} defaultValue={this.props.property.price_per_night}/>:<li className="list-group-item">Price: ${this.props.property.price_per_night}</li>
    let max_guests = this.state.editable ? <input type='text' ref={input => this.max_guests = input} defaultValue={this.props.property.max_guests}/>:<li className="list-group-item">Guests: {this.props.property.max_guests}</li>
    let bedrooms = this.state.editable ? <input type='text' ref={input => this.bedrooms = input} defaultValue={this.props.property.bedrooms}/>:<li className="list-group-item">Bedrooms: {this.props.property.bedrooms}</li>
    let beds = this.state.editable ? <input type='text' ref={input => this.beds = input} defaultValue={this.props.property.beds}/>:<li className="list-group-item">Beds: {this.props.property.beds}</li>
    let baths = this.state.editable ? <input type='text' ref={input => this.baths = input} defaultValue={this.props.property.baths}/>:<li className="list-group-item">Baths: {this.props.property.baths}</li>
    return(
      <React.Fragment>
        <div className="card mb-3" style={{width: "18rem"}}>
          <div className="card-header bg-danger text-white" style={{backgroundColor: "#f1f3f4"}}>
          <svg className="bi bi-house mr-3" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V7h1v6.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5zm11-11V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clipRule="evenodd"/>
            <path fillRule="evenodd" d="M7.293 1.5a1 1 0 011.414 0l6.647 6.646a.5.5 0 01-.708.708L8 2.207 1.354 8.854a.5.5 0 11-.708-.708L7.293 1.5z" clipRule="evenodd"/>
          </svg> Property ID {this.props.property.id}
          </div>
          <ul className="list-group list-group-flush">
            {title}
            {city}
            {country}
            {description}
            {property_type}
            {price_per_night}
            {max_guests}
            {bedrooms}
            {beds}
            {baths}
          </ul>
          <button className="btn btn-sm btn-success" onClick={() => this.handleEdit()}>{this.state.editable? 'Submit' : 'Edit'}</button>
        </div>
      </React.Fragment>
    )
  }
}




export default Property;
