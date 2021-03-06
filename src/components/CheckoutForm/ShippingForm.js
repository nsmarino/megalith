import React from 'react'
import { useFormContext } from 'react-hook-form'

import Input from '../Input'
import StyledButton from '../StyledButton'

import { StyledSelectContainer, StyledCheckboxContainer } from './styles'


const ShippingForm = ({ separateBilling, handleChange }) => {
  const { register, errors } = useFormContext(); // retrieve all hook methods

  return (
    <div>
      <h3>Shipping Address</h3>

      <Input 
        name="shipping.name" 
        placeholder="Name *" 
        register={register({ required: 'Name is required' })}
        errors={errors}
        cy="shipping-name" 
      />

      <Input 
        name="shipping.email" 
        placeholder="Email address *"
        cy="shipping-email" 
        type="email"
        register={register({ required: 'Email is required' })}
        errors={errors} 
      />

      <Input 
        name="shipping.phone" 
        placeholder="Phone number"
        type="tel"
        register={register}
        errors={errors} 
      />

      <Input 
        name="shipping.address1" 
        placeholder="Address line 1 *"
        cy="shipping-address" 
        register={register({ required: 'Address line is required' })}
        errors={errors} 
      />

      <Input 
        name="shipping.address2" 
        placeholder="Apartment, suite, etc. (optional)"
        register={register}
        errors={errors} 
      />

      <Input 
        name="shipping.city" 
        placeholder="City *"
        cy="shipping-city" 
        register={register({ required: 'City is required' })}
        errors={errors} 
      />
      <StyledSelectContainer>
      
      <select name="shipping.state_code" ref={register} data-cy="shipping-state" >
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
      
      <select name="shipping.country_code" defaultValue="US" ref={register}>
        <option>US</option>
      </select>
 
      </StyledSelectContainer>

      <Input 
        name="shipping.zip" 
        placeholder="ZIP Code *" 
        cy="shipping-zip" 
        register={register({ required: 'ZIP Code is required' })}
        errors={errors} 
      />
      
      <StyledCheckboxContainer>
        <label htmlFor="separateBilling">
          <p> 
            <input type="checkbox" id="separateBilling" name="separateBilling" value={separateBilling} onChange={handleChange} />
            Shipping address is different from billing address
          </p>
        </label>
      </StyledCheckboxContainer>

      <StyledButton type="submit" cy="btn">Calculate shipping</StyledButton>
    </div>
  )
}

export default ShippingForm