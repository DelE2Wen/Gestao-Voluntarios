import PropTypes from 'prop-types'

const Input = ({type, placeholder, value, name, text, onChange}) => {
  return (
    <div>
      <label htmlFor={name}>{text}</label>
      <input
        type = {type}
        name = {name}
        id= {name}
        placeholder = {placeholder}
        value={value || ''}
        onChange={onChange}
      />
    </div>
  )
}
Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func
}

export default Input