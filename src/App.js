import React from 'react';
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TankList from './components/TaskList'
import './App.css';

const randomstring = require("randomstring");
// tạo id string
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditting: null,
      keywork: '',
      sortBy: 'name',
      sortValue: 1

    }
  }

  componentDidMount = () => {
    if (localStorage && localStorage.getItem('task')) {
      this.setState({
        tasks: JSON.parse(localStorage.getItem('task'))
      })
    }
  }

  // onHandleData = () => {
  //   const tasks = [
  //     {
  //       id: randomstring.generate(7),
  //       name: 'học',
  //       status: true,
  //     },
  //     {
  //       id: randomstring.generate(7),
  //       name: 'lập',
  //       status: true,
  //     },
  //     {
  //       id: randomstring.generate(7),
  //       name: 'trình',
  //       status: false,
  //     },
  //   ]
  //   localStorage.setItem('task', JSON.stringify(tasks))
  //   this.componentDidMount()
  // }

  onTaskForm = () => {
    if( this.state.isDisplayForm && this.state.taskEditting !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditting: null
      })
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditting: null
      })
    }
  }

  onOpenForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }
  onColseForm = () => {
    this.setState({
      isDisplayForm: false
    })
  }

  onSunmit = params => {
    const { tasks } = this.state
    if ( params.id === '') {
      params.id = randomstring.generate(7)
      tasks.push(params)
    } else {
      let indexTaskUpdate
      tasks.find((task, index) => {
        if (task.id === params.id) {
          return indexTaskUpdate = index
        }
        return indexTaskUpdate
      })
      tasks[indexTaskUpdate] = params
    }

    this.setState({
      tasks: tasks,
      taskEditting: null
    })
    localStorage.setItem('task', JSON.stringify(tasks))
    this.componentDidMount()
  }

  onUpdateStatus = id => {
    const { tasks } = this.state
    const newTask = tasks.map((task, i) => {
      if (id === task.id) {
        task.status = !task.status
      }
      return task
    })
    this.setState({
      tasks: newTask
    })
    localStorage.setItem('task', JSON.stringify(tasks))
  }

  onHandleDeleteItem = id => {
    const { tasks } = this.state
    const newTasks = tasks.filter(task => task.id !== id)

    this.setState({
      tasks: newTasks
    })
    localStorage.setItem('task', JSON.stringify(tasks))
    this.onColseForm()
  }

  onUpdate = id => {
    const { tasks } = this.state
    const taskEdit = tasks.find(task => id === task.id)
    this.setState({
      taskEditting: taskEdit,
    })
    this.onOpenForm()
  }

  onSearch = params => {
    this.setState({
      keywork: params
    })
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
        sortBy,
        sortValue
    })
  }

  render() {
    let { tasks, isDisplayForm, taskEditting, keywork, sortBy, sortValue } = this.state

    if(sortBy === 'name') {
      // tăng giảm theo name
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue
        else if (a.name < b.name) return -sortValue
        else return 0
      })
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sortValue
        else if (a.status < b.status) return sortValue
        else return 0
      })
    }

    const eleForm = isDisplayForm
      ? <TaskForm
          displayForm={ this.onTaskForm }
          onSubmit={ this.onSunmit }
          task={ taskEditting }
        />
      : ''
    return (
      <>
        <div className="container">
          <div className="text-center">
              <h1>Quản Lý Công Việc</h1>
              <hr/>
          </div>

          <div className="row">
            <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
              { eleForm }
            </div>
            <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
              <button
                type="button"
                className="btn btn-primary mr-5"
                onClick={ this.onTaskForm }
              >
                <span className="fa fa-plus mr-5"></span>Thêm Công Việc
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={ this.onHandleData }
              >
                Generate Data
              </button>

                <Control
                  onSearch={ this.onSearch }
                  onSort={ this.onSort }
                  sortBy={sortBy}
                  sortValue={sortValue}
                />

                <TankList
                  tasks={ this.state.tasks }
                  onUpdateStatus={ this.onUpdateStatus }
                  onHandleDeleteItem={ this.onHandleDeleteItem }
                  onUpdate={ this.onUpdate }
                  keywork={ keywork }
                />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App;
