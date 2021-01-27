const Notify = ({ errorMessage }) => {
  const styles = {
    padding: '1rem',
    position: 'fixed',
    top: '10%',
    left: '40%',
    color: 'red',
    borderRadius: '5%',
    boxShadow: '4px 6px 5px 2px rgba(0,0,0,0.75)'
  }
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={styles}>
    {errorMessage}
    </div>
  )
}

export default Notify
