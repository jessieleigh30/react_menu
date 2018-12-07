import React, {Component} from 'react';
import axios from 'axios';

class Menu extends Component {
  state={
    items: []
  }

  componentDidMount() {
    let {id} = this.props
    axios.get(`/api/menus/${id}/items`)
    .then(res => {
      this.setState ({
        items: res.data
      })

    })
  }
  render (){
    let {menuName} = this.props
    return(
      <>
        <div className ="menu">
        <h1>{menuName}</h1>
      </div>
      </>
    )
  }
}

export default Menu;