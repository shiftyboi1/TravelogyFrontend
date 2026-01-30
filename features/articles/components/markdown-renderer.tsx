import { FontSizes } from '@/constants/theme';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useMemo } from 'react';
import { EnrichedMarkdownText, MarkdownStyle } from 'react-native-enriched-markdown';

export type MarkdownRendererProps = {
  markdown?: string;
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {

  const markdownContent = markdown || `# Loading...`;
  const textColor = useThemeColor({}, 'text');
  const linkColor = useThemeColor({}, 'secondary');

  const markdownStyle = useMemo(() => ({
    paragraph: { fontSize: FontSizes.default, color: textColor },
    h1: { fontSize: FontSizes.header, fontWeight: 'bold', color: textColor },
    list: { fontSize: FontSizes.default, color: textColor },
    strong: { fontWeight: 'bold', color: textColor },
    codeBlock: { backgroundColor: '#1E1E1E', color: '#D4D4D4' },
    link: { color: linkColor, fontSize: FontSizes.default - 2, textDecorationLine: 'underline'},
  }), []);

  return (<EnrichedMarkdownText
    markdown={markdownContent}
    markdownStyle={markdownStyle as MarkdownStyle}
    containerStyle={{ padding: 16 }}
    isSelectable={true}  // Enables text selection/copy
    onLinkPress={(event) => console.log(event.url)}  // Optional
  />);


}