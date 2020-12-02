import React from 'react'
import TankItem from './TankItem'

class TankList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterName: '',
      filterStatus: -1, // all -1 kisch hoajt 1, an 0
      keywork: this.props.keywork ? this.props.keywork : ''
    }
  }

  onChange = e => {
    const { name } = e.target
    const value  = e.target.type === 'text' ? e.target.value.toLowerCase() : +e.target.value
    this.setState({
      [name]: value
    })

  }

  render() {
    let { tasks } = this.props
    const { filterName, filterStatus, keywork } = this.state

    if (filterName) {
      if(filterName !== '') {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filterName) !== -1
        })
        // console.log(tasks )
      }

      tasks = tasks.filter(task => {
        if (filterStatus === -1) {
          return task
        } else {
          return task.status === (filterStatus === 1 ? true : false)
        }
      })
    } else {
      tasks = tasks.filter(task => {
        if (filterStatus === -1) {
          return task
        } else {
          return task.status === (filterStatus === 1 ? true : false)
        }
      })
    }
    if (keywork) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(this.props.keywork) !== -1
      })
    }
    

    const elements = tasks.map((ele, index) => {
      return  <TankItem
                ele={ ele }
                key={ ele.id }
                index={ index }
                onUpdateStatus={ this.props.onUpdateStatus }
                onHandleDeleteItem={ this.props.onHandleDeleteItem }
                onUpdate={ this.props.onUpdate }
               />
    })
    return (
      <>
      <div className="row mt-15">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th className="text-center">STT</th>
                  <th className="text-center">Tên</th>
                  <th className="text-center">Trạng Thái</th>
                  <th className="text-center">Hành Động</th>
                </tr>
              </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="filterName"
                        value= { filterName }
                        onChange={ this.onChange}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control"
                        name="filterStatus"
                        value={ filterStatus }
                        onChange={ this.onChange}
                      >
                        <option value="-1">Tất Cả</option>
                        <option value="0">Ẩn</option>
                        <option value="1">Kích Hoạt</option>
                      </select>
                    </td>
                    <td></td>
                  </tr>
                  { elements }
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}

export default TankList;
