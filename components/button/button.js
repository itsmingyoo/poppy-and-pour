function Button(props) {
  // Post Review Button
  // Edit Review Button
  if (props.reviews) {
    return <button onClick={props.onClick}>Edit Review</button>;
  }
}

export default Button;
