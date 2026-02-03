import { FontSizes } from '@/constants/theme';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useMemo } from 'react';
import { EnrichedMarkdownText, MarkdownStyle } from 'react-native-enriched-markdown';

export type MarkdownRendererProps = {
  markdown?: string;
  style?: object;
}

export function MarkdownRenderer({ markdown, style }: MarkdownRendererProps) {

  const markdownContent = markdown || `# Loading...`;
  const textColor = useThemeColor({}, 'text');
  const linkColor = useThemeColor({}, 'secondary');

  const UNAVAILABLE_TEXT = "This mode of transport is unavailable in the desired location."

  const markdownStyle = useMemo(() => ({
    paragraph: { fontSize: FontSizes.default, color: textColor, marginBottom: 12, textAlign: 'justify' },
    h1: { fontSize: FontSizes.header, fontWeight: 'bold', color: textColor },
    h2: { fontSize: FontSizes.header, fontWeight: 'bold', color: textColor, marginBottom: 16 },
    list: { fontSize: FontSizes.default, color: textColor, textAlign: 'justify', gapWidth: 16, lineHeight: FontSizes.default + 2 },
    strong: { fontWeight: 'bold', color: textColor },
    codeBlock: { backgroundColor: '#1E1E1E', color: '#D4D4D4' },
    link: { color: linkColor, fontSize: FontSizes.default - 2, textDecorationLine: 'underline'},
  }), [textColor]);

  return (<EnrichedMarkdownText
    markdown={markdownContent === "NO" ? UNAVAILABLE_TEXT : markdownContent}
    markdownStyle={markdownStyle as MarkdownStyle}
    containerStyle={style}
    isSelectable={true}  
  />);
}