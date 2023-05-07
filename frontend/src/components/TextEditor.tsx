import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "./TextEditor.css";

type RichEditorProps = {};
type RichEditorState = {
  editorState: EditorState;
};

export default class RichEditorExample extends React.Component<
  RichEditorProps,
  RichEditorState
> {
  constructor(props: {}) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
		this.onChange = this.onChange.bind(this);
  }

  onChange(editorState: EditorState) {
    return this.setState({ editorState });
  }

  handleKeyCommand(command: string, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  render() {

		console.log(this.state.editorState);

    return (
      <Editor
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange}
      />
    );
  }
}