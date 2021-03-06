import React from 'react'
import { useFormContext } from 'react-hook-form'
import Input from '../Input'

import { StyledSelectContainer } from './styles'


const BillingForm = (props) => {
  const { register, errors } = useFormContext(); // retrieve all hook methods

  return (
    <div>
      <h3>Billing Address</h3>

      <Input 
        name="billing.name" 
        placeholder="Name *" 
        register={register({ required: 'Name is required' })}
        errors={errors} 
      />

      <Input 
        name="billing.email" 
        placeholder="Email address *"
        type="email"
        register={register({ required: 'Email is required' })}
        errors={errors} 
      />

      <Input 
        name="billing.phone" 
        placeholder="Phone number"
        type="tel"
        register={register}
        errors={errors} 
      />

      <Input 
        name="billing.address1" 
        placeholder="Address line 1 *"
        register={register({ required: 'Address line is required' })}
        errors={errors} 
      />

      <Input 
        name="billing.address2" 
        placeholder="Apartment, suite, etc. (optional)"
        register={register}
        errors={errors} 
      />

      <Input 
        name="billing.city" 
        placeholder="City *"
        register={register({ required: 'City is required' })}
        errors={errors} 
      />
      <StyledSelectContainer>
      <select name="billing.state_code" ref={register}>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District Of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>	

      <select name="billing.country_code" defaultValue="US" ref={register}>
        <option>US</option>
      </select>
      </StyledSelectContainer>

      <Input 
        name="billing.zip" 
        placeholder="ZIP Code *" 
        register={register({ required: 'ZIP Code is required' })}
        errors={errors} 
      />
    </div>
  )
}

export default BillingForm