import React from 'react';
import axios from 'axios';
import ItemForm from './ItemForm';

class Menu extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {
    let { id } = this.props
    axios.get(`/api/menus/${id}/items`)
      .then(res => {
        this.setState({
          items: res.data
        })

      })
  }

  addItem = (id, name, price) => {
    axios.post(`/api/menus/${id}/items`, { name, price })
      .then(res => {
        const { items } = this.state;
        this.setState({
          items: [...items, res.data]
        })
      })
  }

  deleteItem = (menu_id, id) => {
    axios.delete(`/api/menus/${menu_id}/items/${id}`)
      .then(res => {
        const { items } = this.state;
        this.setState({ items: items.filter(t => t.id !== id) })
      })
  }

  // updateItem = (id) => {
  //   axios.put(`/api/items/${id}`)
  //     .then( res => {
  //       const items = this.state.items.map( t => {
  //       if (t.id === id)
  //         return res.data;
  //       return t;
  //     });
  //     this.setState({ items, });
  //   })
  // }

  render() {
    let { menuName, id } = this.props
    let { items } = this.state
    return (
      <>
        <div className="menu">
          <h1>{menuName}</h1>
          <hr />
          <ItemForm id={id} add={this.addItem} />
          {items.map(item =>
            <div key={item.id}>
              <p>{item.name}{item.price}</p>
              <button onClick={() => this.deleteItem(id, item.id)}>Delete</button>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Menu;