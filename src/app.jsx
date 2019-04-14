import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: '',
      amountReceived: '',
      changeDue: 'Please enter amounts',
      twenties: '',
      tens: '',
      fives: '',
      ones: '',
      quarters: '',
      dimes: '',
      nickels: '',
      pennies: '',
    };
    this.updateAmountDue = this.updateAmountDue.bind(this);
    this.updateAmountReceived = this.updateAmountReceived.bind(this);

    this.calculateButton = this.calculateButton.bind(this);
  }

  updateAmountDue(event) {
    this.setState({ amountDue: event.target.value });
  }

  updateAmountReceived(event) {
    this.setState({ amountReceived: event.target.value });
  }

  calculateButton(event) {
    event.preventDefault();
    const amountDue = this.state.amountDue;
    const amountReceived = this.state.amountReceived;
    const changeDue = amountReceived - amountDue;

    const amountDueInPennies = 100 * amountDue;
    const amountReceivedInPennies = 100 * amountReceived;

    const amountDueInPenniesRounded = Math.round(amountDueInPennies);
    const amountReceivedInPenniesRounded = Math.round(amountReceivedInPennies);

    let changeDueInPennies = amountReceivedInPenniesRounded - amountDueInPenniesRounded;
    const denominations = [2000, 1000, 500, 100, 25, 10, 5, 1];
    const resultsArray = [];

    denominations.forEach((denomination) => {
      const remainder = changeDueInPennies % denomination;
      const divisee = changeDueInPennies - remainder;
      const result = divisee / denomination;
      resultsArray.push(result);
      changeDueInPennies = remainder;
    });

    this.setState({ changeDue: changeDue.toFixed(2) });
    this.setState({ twenties: resultsArray[0] });
    this.setState({ tens: resultsArray[1] });
    this.setState({ fives: resultsArray[2] });
    this.setState({ ones: resultsArray[3] });
    this.setState({ quarters: resultsArray[4] });
    this.setState({ dimes: resultsArray[5] });
    this.setState({ nickels: resultsArray[6] });
    this.setState({ pennies: resultsArray[7] });
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='page-header'>
          <h1 className='title-white'>Change Calculator</h1>
        </div>

        <div className='row container-fluid'>

          {/* Input Panel */}
          <div className='col-md-4 form-group'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Enter Information</div>

              {/* Input Amounts */}
              <div className='panel-body'>
                <div>
                  <label htmlFor='amountDue'>How much is due?</label>
                  <input
                    type='number'
                    name='amountDue'
                    placeholder='0'
                    value={ this.state.amountDue }
                    onChange={ this.updateAmountDue }
                  />
                </div>
                <div>
                  <label htmlFor='amountReceived'>How much was received?</label>
                  <input
                    type='number'
                    name='amountReceived'
                    placeholder='0'
                    value={ this.state.amountReceived }
                    onChange={ this.updateAmountReceived }
                  />
                </div>
              </div>

              {/* Caluculate Button */}
              <div className='panel-footer clearfix'>
                <button
                  type='button'
                  name='button'
                  className='btn btn-primary btn-lg btn-block'
                  onClick={ this.calculateButton }
                >Calculate</button>
              </div>

            </div>
          </div>
          {/* Output Panel*/}

          {/* Change Due */}
          <div className='col-md-8 panel'>
            <div className='text-center'>
              {this.state.changeDue ? this.state.changeDue > 0 ? (<div className='alert alert-success'>The total change due is ${ this.state.changeDue }</div>) : (<div className='alert alert-danger'>Additional money is owed</div>) : ''}
            </div>

            {/* Denominations 1-4 of 8 */}
            <div className='text-center'>

              <div className='col-md-3'>
                <div className='well'>
                  <h3>Twenties</h3>
                  <output className='change'>{this.state.twenties}</output>
                </div>
              </div>

              <div className='col-md-3'>
                <div className='well'>
                  <h3>Tens</h3>
                  <output className='change'>{this.state.tens}</output>
                </div>
              </div>

              <div className='col-md-3'>
                <div className='well'>
                  <h3>Fives</h3>
                  <output className='change'>{this.state.fives}</output>
                </div>
              </div>

              <div className='col-md-3'>
                <div className='well'>
                  <h3>Ones</h3>
                  <output className='change'>{this.state.ones}</output>
                </div>
              </div>

              {/* {Denominations 5-8 of 8 */}
              <div className='col-md-3'>
                <div className='well'>
                  <h3>Quarters</h3>
                  <output className='change'>{this.state.quarters}</output>
                </div>
              </div>

              <div className='col-md-3'>
                <div className='well'>
                  <h3>Dimes</h3>
                  <output className='change'>{this.state.dimes}</output>
                </div>
              </div>

              <div className='col-md-3'>
                <div className='well'>
                  <h3>Nickels</h3>
                  <output className='change'>{this.state.nickels}</output>
                </div>
              </div>

              <div className='col-md-3'>
                <div className='well'>
                  <h3>Pennies</h3>
                  <output className='change'>{this.state.pennies}</output>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
