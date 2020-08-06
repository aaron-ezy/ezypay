import React from 'react';
import '../sass/app.scss';

const FormGroup = ({ children }) => <div className='form__group'>{children}</div>

const FormLabel = ({ text }) => <div className='form__label'>{text}</div>

// Please note that I was given 30 minutes for this. 🙈
const App = () => {
  const [subscription_type_options, setSubscriptionTypeOptions] = React.useState(['Not applicable']);
  const [is_type_options_disabled, setIsTypeOptionsDisabled] = React.useState(true);

  const onSubscriptionTypeChange = (event) => {
    switch (event.target.value) {
      case ('Daily'): {
        setSubscriptionTypeOptions(['Not applicable']);
        setIsTypeOptionsDisabled(true);
        break;
      }
      case ('Weekly'): {
        setSubscriptionTypeOptions([
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ]);
        setIsTypeOptionsDisabled(false);
        break;
      }
      case ('Monthly'): {
        const days = [];
        // Don't have Babel plugin for iterator and npm is down. :-(
        for (let i = 0; i < 31; i++) days.push(i + 1);
        setSubscriptionTypeOptions(days);
        setIsTypeOptionsDisabled(false);
        break;
      }
    }
  }

  return (
    <form className='form' action='#'>
      <h1>Create A Subscription</h1>
      <FormGroup>
        <FormLabel text='Amount:' />
        <input className='form__number-input' type='number' />
      </FormGroup>

      <FormGroup>
        <FormLabel text='Subscription type:' />
        <select id='subscription_type' className='form__dropdown' onChange={onSubscriptionTypeChange}>
          <option value='Daily'>Daily</option>
          <option value='Weekly'>Weekly</option>
          <option value='Monthly'>Monthly</option>
        </select>
      </FormGroup>

      <FormGroup>
        <FormLabel text='Day of week or month:' />
        <select id='day_of_week_or_month' className='form__dropdown' disabled={is_type_options_disabled}>
          {subscription_type_options.map((dropdown_option, idx) =>
            <option key={idx} value={dropdown_option}>{dropdown_option}</option>
          )}
        </select>
      </FormGroup>

      <FormGroup>
        <FormLabel text='Start date:' />
        <input className='form__date-input' type='date' />
      </FormGroup>

      <FormGroup>
        <FormLabel text='End date:' />
        <input className='form__date-input' type='date' />
      </FormGroup>
      <input className='form__submit' type='submit' value='Create' />
    </form>
  )
};

export default App;