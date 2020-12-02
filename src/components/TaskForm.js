import React from 'react';

class TaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      id: '',
      name: '',
      status: false
    }
  }

  onClose = () => {
    this.props.displayForm()
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.onResetData()
    this.onClose()
  }

  onHanldChange = e => {
    let { name, value } = e.target
    if (name === 'status') {
      value = value === 'true' ? true : false
    }
    this.setState({
      [name]: value
    })
  }

  onResetData = () => {
    this.setState({
      name: '',
      status: false
    })
  }

  componentDidMount () {
    if ( this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status,
      })
    } else if (nextProps && nextProps.task === null) {
      this.setState({
        id: '',
        name: '',
        status: false
      })
    }
  }

  render() {
    const { id } = this.state
    return (
      <>
        <div className="panel panel-warning">
          <div className="panel-heading">
              <h3 className="panel-title">
                { id !== '' ? 'Cập nhật công việc' : 'Thêm Công Việc'}
                <span
                  className=" text-right"
                  onClick={ this.onClose }
                >
                  <i className="fa fa-times-circle"/>
                </span>
              </h3>
          </div>

          <div className="panel-body">
              <form onSubmit={ this.onSubmit }>
                  <div className="form-group">
                      <label>Tên :</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={ this.state.name }
                        onChange={ this.onHanldChange }
                      />
                  </div>

                  <label>Trạng Thái :</label>
                  <select
                    className="form-control"
                    name="status"
                    value={ this.state.status }
                    onChange={ this.onHanldChange }
                  >
                      <option value={ true }>Kích Hoạt</option>
                      <option value={ false }>Ẩn</option>
                  </select>
                  <br/>

                  <div className="text-center">
                      <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                      <button type="submit" className="btn btn-danger" onClick={ this.onResetData }>Hủy Bỏ</button>
                  </div>
              </form>
          </div>
        </div>
      </>
    )
  }
}

export default TaskForm;
