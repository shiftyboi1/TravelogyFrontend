import { ThemedText } from '@/components/themed-text';
import { Colors, PriceColors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';
import { ArticleDelimiter } from '../types/types';

const TicketBackground = ({ width, height, cutoutX }: { width: number, height: number, cutoutX: number }) => {
  const color = useThemeColor({ light: Colors.light.backgroundSecondary, dark: Colors.light.background }, 'background');

  const radius = 16;
  const cutoutRadius = 20;

  const d = `
    M ${radius} 0
    L ${cutoutX - cutoutRadius} 0
    A ${cutoutRadius} ${cutoutRadius} 0 0 0 ${cutoutX + cutoutRadius} 0
    L ${width - radius} 0 Q ${width} 0 ${width} ${radius}
    V ${height - radius} Q ${width} ${height} ${width - radius} ${height}
    L ${cutoutX + cutoutRadius} ${height}
    A ${cutoutRadius} ${cutoutRadius} 0 0 0 ${cutoutX - cutoutRadius} ${height}
    L ${radius} ${height} Q 0 ${height} 0 ${height - radius}
    V ${radius} Q 0 0 ${radius} 0
    Z
  `;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg width={width} height={height + 30} viewBox={`0 0 ${width} ${height + 30}`}>
        {/* SHADOW */}
        <Path d={d} fill="black" opacity={0.5} transform={"translate(0, 6)"} />

        {/* MAIN TICKET SHAPE */}
        <Path d={d} fill={color} />

        {/* VERTICAL PERFORATION LINE */}
        <Line 
          x1={cutoutX} y1={cutoutRadius + 5} 
          x2={cutoutX} y2={height - cutoutRadius - 5} 
          stroke="#E0E0E0" strokeWidth="2" strokeDasharray="6, 4" 
        />
      </Svg>
    </View>
  );
};

export type TicketProps = {
  delimiter: ArticleDelimiter;
  content: {
    operatingHours?: string;
    relativePrice?: 'LOW' | 'MID' | 'HIGH';
  }
  style?: object;
};

export function Ticket({ delimiter, content, style }: TicketProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [leftWidth, setLeftWidth] = useState(0);

  const onWrapperLayout = (event: LayoutChangeEvent) => {
    setSize(event.nativeEvent.layout);
  };

  const onLeftLayout = (event: LayoutChangeEvent) => {
    setLeftWidth(event.nativeEvent.layout.width);
  };

  const textColor = useThemeColor({dark: Colors.light.text }, 'text');
  const priceColor = content.relativePrice ? PriceColors[content.relativePrice] : textColor;
  const [location, locationSecondary] = delimiter.location.split(' ; ');
  const tagText = delimiter.tag.charAt(0).toUpperCase() + delimiter.tag.slice(1);

  return (
    <View style={[styles.container, style]} onLayout={onWrapperLayout}>
      {size.width > 0 && (
        <TicketBackground 
          width={size.width} 
          height={size.height} 
          cutoutX={leftWidth} 
        />
      )}

      <View style={styles.contentRow}>

        <View onLayout={onLeftLayout} style={styles.leftSection}>
          <ThemedText type="header" style={[styles.title, { color: textColor }]}>{tagText}</ThemedText>
          <ThemedText type="subtitle" style={[styles.subtitle, { color: textColor }]}>{delimiter.location}</ThemedText>
          <ThemedText type="subtitle" style={[styles.subtitle, { color: textColor }]}>{content.operatingHours && (`(${content.operatingHours})`)}</ThemedText>
        </View>

        <View style={styles.rightStub}>
           { content.relativePrice && <ThemedText type='subtitle' style={{ color: textColor }}>Price:</ThemedText> }
           { content.relativePrice && <ThemedText type='subtitle' style={[styles.time, { color: priceColor, borderColor: priceColor, backgroundColor: `${priceColor}20` }]}>{content.relativePrice}</ThemedText> }
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  contentRow: {
    flexDirection: 'row',
  },
  leftSection: {
    flex: 3, // Wide side
    padding: 24,
    justifyContent: 'center',
  },
  rightStub: {
    flex: 1, // Narrow decorative side
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Text Styles
  title: { 
    fontWeight: 'bold', 
  },
  subtitle: { 
    marginTop: 4 
  },
  time: { 
    fontSize: 14, 
    fontWeight: '800', 
    marginTop: 12,
    letterSpacing: 1,
    borderWidth: 2,
    padding: 4,
    borderRadius: 8,
  }
});