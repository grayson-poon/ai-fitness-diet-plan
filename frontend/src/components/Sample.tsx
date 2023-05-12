import React from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";

type RichEditorProps = {}
type RichEditorState = {
	editorState: EditorState
}

export default class RichEditorExample extends React.Component<RichEditorProps, RichEditorState> {
  constructor(props: {}) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

	onChange(editorState: EditorState) {
		return this.setState({ editorState });
	}


  handleKeyCommand(command: string, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
		return (
			<Editor editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange} />
		)
  }
}

// // Custom overrides for "code" style.
// const styleMap = {
//   CODE: {
//     backgroundColor: "rgba(0, 0, 0, 0.05)",
//     fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//     fontSize: 16,
//     padding: 2,
//   },
// };

// function getBlockStyle(block: { getType: () => any; }) {
//   switch (block.getType()) {
//     case "blockquote":
//       return "RichEditor-blockquote";
//     default:
//       return null;
//   }
// }

// class StyleButton extends React.Component {
//   constructor(props: {} | Readonly<{}>) {
//     super(props);
//     this.onToggle = (e: { preventDefault: () => void; }) => {
//       e.preventDefault();
//       this.props.onToggle(this.props.style);
//     };
//   }

//   render() {
//     let className = "RichEditor-styleButton";
//     if (this.props.active) {
//       className += " RichEditor-activeButton";
//     }

//     return (
//       <span className={className} onMouseDown={this.onToggle}>
//         {this.props.label}
//       </span>
//     );
//   }
// }

// const BLOCK_TYPES = [
//   { label: "H1", style: "header-one" },
//   { label: "H2", style: "header-two" },
//   { label: "H3", style: "header-three" },
//   { label: "H4", style: "header-four" },
//   { label: "H5", style: "header-five" },
//   { label: "H6", style: "header-six" },
//   { label: "Blockquote", style: "blockquote" },
//   { label: "UL", style: "unordered-list-item" },
//   { label: "OL", style: "ordered-list-item" },
//   { label: "Code Block", style: "code-block" },
// ];

// const BlockStyleControls = (props: { onToggle?: any; editorState?: any; }) => {
//   const { editorState } = props;
//   const selection = editorState.getSelection();
//   const blockType = editorState
//     .getCurrentContent()
//     .getBlockForKey(selection.getStartKey())
//     .getType();

//   return (
//     <div className="RichEditor-controls">
//       {BLOCK_TYPES.map((type) => (
//         <StyleButton
//           key={type.label}
//           active={type.style === blockType}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       ))}
//     </div>
//   );
// };

// var INLINE_STYLES = [
//   { label: "Bold", style: "BOLD" },
//   { label: "Italic", style: "ITALIC" },
//   { label: "Underline", style: "UNDERLINE" },
//   { label: "Monospace", style: "CODE" },
// ];

// const InlineStyleControls = (props: { editorState: { getCurrentInlineStyle: () => any; }; onToggle: any; }) => {
//   const currentStyle = props.editorState.getCurrentInlineStyle();

//   return (
//     <div className="RichEditor-controls">
//       {INLINE_STYLES.map((type) => (
//         <StyleButton
//           key={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       ))}
//     </div>
//   );
// };
