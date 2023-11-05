function Button(props) {
  // Post Review Button
  if (props.post) {
    return <button type={props.type}>{props.post}</button>;
  }
  // Edit Review Button
  if (props.edit) {
    return <button onClick={props.onClick}>{props.edit}</button>;
  }

  // Delete Review Button
  if (props.delete) {
    return <button onClick={props.onClick}>{props.delete}</button>;
  }
}

export default Button;
