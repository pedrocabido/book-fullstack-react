import React from 'react';
import isEmail from 'validator/lib/isEmail';

const Field = require('./03-field-component-field.js');

const content = document.createElement('div');
document.body.appendChild(content);

class Three extends React.Component {
  static displayName = "03-basic-input";

  state = {
    fields: {
      name: '',
      email: '',
    },
    fieldErrors: {},
    people: [],
  };

  onFormSubmit = evt => {
    const people = [ ...this.state.people ];
    const person = this.state.fields;

    evt.preventDefault();

    if (this.validate()) return;

    this.setState({
      people: people.concat(person),
      fields: { 
        name: '',
        email: '',
      }
    });
  };

  onInputChange = ({name, value, error}) => {
    const fields = Object.assign({}, this.state.fields);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);

    fields[name] = value;
    fieldErrors[name] = error;
    
    this.setState({ fields, fieldErrors });
  };

  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);

    if (!person.name) return true;
    if (!person.email) return true;
    if (errMessages.length) return true;

    return false;
  };


  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit} id="signUp" name="signUp">
          <Field
            placeholder='Name'
            name='name'
            value={this.state.fields.name}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Name Required')}
          />

        <br/>

        <Field
            placeholder='Email'
            name='email'
            type='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
            validate={val => (isEmail(val) ? false : 'Invalid Email')}
          />

        <br/>

          <input type='submit' disabled={this.validate()}/>
        </form>

        <br/>

        <div>
          <h3>People</h3>
          <ul>
            { this.state.people.map(({name, email}, i) => (
              <li key={i}>
                {name} ({email})
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default Three;