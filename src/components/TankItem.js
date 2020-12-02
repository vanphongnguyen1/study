import React from 'react';

class TankItem extends React.Component {

  onHandleStatus = () => {
    this.props.onUpdateStatus(this.props.ele.id)
  }

  onHandleDeleteItem = () => {
    this.props.onHandleDeleteItem(this.props.ele.id)
  }

  onUpdate = () => {
    this.props.onUpdate(this.props.ele.id)
  }

  render() {
    const { ele, index } = this.props

    return (
      <>
        <tr>
          <td>{ index + 1 }</td>
          <td>{ ele.name }</td>
          <td className="text-center">
            <span
              className={ ele.status ? 'label label-success' : 'label label-danger'}
              onClick={ this.onHandleStatus }
            >
              { ele.status ? 'kích hoạt' : 'Ẩn'}
            </span>
          </td>
          <td className="text-center">
            <button
              type="button"
              className="btn btn-warning"
              onClick={ this.onUpdate }
            >
              <span className="fa fa-pencil mr-5"></span>Sửa
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-danger"
              onClick={ this.onHandleDeleteItem }
            >
              <span className="fa fa-trash mr-5"></span>Xóa
            </button>
          </td>
        </tr>
      </>
    )
  }
}

export default TankItem;
