import { FontSizes } from '@/constants/theme';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useMemo } from 'react';
import { EnrichedMarkdownText, MarkdownStyle } from 'react-native-enriched-markdown';

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
  const textColor = useThemeColor({}, 'text');

  const markdownStyle = useMemo(() => ({
    paragraph: { fontSize: FontSizes.default, color: textColor },
    h1: { fontSize: FontSizes.header, fontWeight: 'bold', color: textColor },
    strong: { fontWeight: 'bold', color: textColor },
    codeBlock: { backgroundColor: '#1E1E1E', color: '#D4D4D4' },
  }), []);

  return (<EnrichedMarkdownText
    markdown={markdownContent}
    markdownStyle={markdownStyle as MarkdownStyle}
    containerStyle={{ padding: 16 }}
    isSelectable={true}  // Enables text selection/copy
    onLinkPress={(event) => console.log(event.url)}  // Optional
  />);


}