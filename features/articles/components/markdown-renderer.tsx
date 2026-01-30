import React, { useMemo } from 'react';
import { EnrichedMarkdownText } from 'react-native-enriched-markdown';

export function MarkdownRenderer() {

  const markdownContent = `
# Welcome to Markdown!

This is a paragraph with **bold**, *italic*, and [links](https://reactnative.dev).

- List item one
- List item two
  - Nested item

\`\`\`javascript
const greeting = 'Hello, World!';
console.log(greeting);
\`\`\`
`;

  const markdownStyle = useMemo(() => ({
    paragraph: { fontSize: 16, lineHeight: 24 },
    h1: { fontSize: 32, fontWeight: 'bold' },
    strong: { fontWeight: 'bold' },
    codeBlock: { backgroundColor: '#1E1E1E', color: '#D4D4D4' },
  }), []);

  return (<EnrichedMarkdownText
    markdown={markdownContent}
    containerStyle={{ padding: 16 }}
    isSelectable={true}  // Enables text selection/copy
    onLinkPress={(event) => console.log(event.url)}  // Optional
  />);

}