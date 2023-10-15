import { forwardRef } from 'react'
import { messages } from "../messages/messages"
import StyledTableNumberInput from './styles/StyledTableNumberInput'

const muiPhoneInput = (props, ref) => {

  return (
    <StyledTableNumberInput
      {...props}
      inputRef={ref}
      fullWidth
      InputLabelProps={{ required: false }}
      size='standard'
      label={<div>
        {messages[props.selectedLocale].registrationPhoneNumber}
        <span className="input-required">
          {messages[props.selectedLocale].inputRequired}
        </span>
      </div>}
      variant='outlined'
      required
    />
  )
}
export default forwardRef(muiPhoneInput)