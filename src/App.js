import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      passWork: '',
      note: '',
      gender: '',
      language: 'english',
      checkbox: true
    }
  }
  onHandleChange = e => {
    const { name } = e.target
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    this.setState({
      [name]: value,
    })
  }

  onHandleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    return(
      <>
        <div className="container mt-30">
          <div className="row">
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
              <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">Form</h3>
                  </div>
                  <div className="panel-body">

                    <form onSubmit={ this.onHandleSubmit }>

                      <div className="form-group">
                        <label >User Name:</label>
                        <input
                          type="text"
                          name="userName"
                          className="form-control"
                          value={ this.state.userName }
                          onChange={ this.onHandleChange } />
                      </div>

                      <div className="form-group">
                        <label >Passwork:</label>
                        <input
                          type="text"
                          name="passWork"
                          className="form-control"
                          value={ this.state.passWork }
                          onChange={ this.onHandleChange } />
                      </div>

                      <div className="form-group">
                        <label >Mô tả:</label>
                        <textarea
                          name="note"
                          className="form-control"
                          rows="3"
                          onChange={ this.onHandleChange }
                        ></textarea>
                      </div>

                      <label >Giới tính:</label>
                      <select
                        className="form-control"
                        name="gender"
                        value={ this.state.gender }
                        onChange={ this.onHandleChange }
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>

                      <label >Ngôn ngữ</label>
                      <div className="radio">
                        <label>
                          <input
                            type="radio"
                            name="language"
                            value="english"
                            onChange={ this.onHandleChange }
                            checked={ this.state.language === 'english' }
                          />
                          English
                        </label><br />
                        <label>
                          <input
                            type="radio"
                            name="language"
                            value="vietnamese"
                            onChange={ this.onHandleChange }
                            checked={ this.state.language === 'vietnamese' }
                          />
                          Việt Nam
                        </label>
                      </div>

                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="checkbox"
                            value={ true }
                            onChange={ this.onHandleChange }
                            checked={ this.state.checkbox === true}
                          />
                          Checkbox
                        </label>
                      </div>

                      <button type="submit" className="btn btn-primary">Lưu lại</button>&nbsp;
                      <button type="reset" className="btn btn-default">Reset</button>
                    </form>

                  </div>
              </div>
            </div>
          </div>

        </div>

      </>
    )
  }
}

export default App;
