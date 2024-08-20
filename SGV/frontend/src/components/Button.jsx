const Button = ({ type, children, disabled }) => {
  return (
    <button type={type || 'button'} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button