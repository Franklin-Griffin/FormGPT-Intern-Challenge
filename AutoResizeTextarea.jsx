import React, { Component } from 'react';

class AutoResizeTextarea extends Component {
  constructor(props) {
    super(props);
    this.textareaRef = React.createRef();
  }

  componentDidMount() {
    const textarea = this.textareaRef.current;

    const adjustTextareaHeight = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener('input', adjustTextareaHeight);
    adjustTextareaHeight(); // Initial adjustment
  }

  componentWillUnmount() {
    const textarea = this.textareaRef.current;
    textarea.removeEventListener('input', this.adjustTextareaHeight);
  }

  render() {
    const { defaultValue, ...props } = this.props;
    return (
      <textarea
        ref={this.textareaRef}
        defaultValue={defaultValue}
        {...props}
        style={{
          resize: 'none',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          minHeight: '2rem',
          lineHeight: '1.25',
        }}
        rows={1}
      />
    );
  }
}

export default AutoResizeTextarea;
