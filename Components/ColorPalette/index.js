import PropTypes from 'prop-types';
import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ColorOption from './color-option';

const ColorPalette = (props) => {

  const {
    colors,
    icon,
    onChange,
    setCount,
    paletteStyles,
    maxCount,
    scaleToWindow,
    title,
    titleStyles,
    value,
  } = props;
  const [selectedColors, insertColor] = useState([]);
  const [count, numSelected] = useState(0);
  const [color, setColor] = useState(colors[0]);
  useEffect(() => {
    setColor(value);
    return () => { };
  }, [value]);

  const addSelected = useCallback((color) => {
    if(count < maxCount) {
      setColor(color);
      numSelected(count => count + 1 );
      setCount(count);
      onChange(color);

    }
  }, []);

  const subtractSelected = useCallback(() => {
    numSelected(count => count - 1 );
    setCount(count);
  }, []);

  return (
    <Fragment>
      <Text style={[styles.titleStyles, { ...titleStyles }]}>{title}</Text>
      <View style={[styles.colorContainer, { ...paletteStyles }]}>
        {colors.map((c) => (
          <ColorOption
            key={c}
            color={c}
            icon={icon}
            count={count}
            addSelected={addSelected}
            subtractSelected={subtractSelected}
            scaleToWindow={scaleToWindow}
            selectedColor={color}
          />
        ))}
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  titleStyles: {
    color: 'black',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

ColorPalette.defaultProps = {
  colors: [
    '#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9', '#3498DB', '#1ABC9C',
    '#16A085', '#27AE60', '#2ECC71', '#F1C40F', '#F39C12', '#E67E22', '#D35400',
    '#FFFFFF', '#BDC3C7', '#95A5A6', '#7F8C8D', '#34495E', '#2C3E50', '#000000',
  ],
  defaultColor: null,
  onChange: () => { },
  paletteStyles: {},
  scaleToWindow: false,
  title: "Color Palette:",
  titleStyles: {},
  isSelected: false,
  value: null,
};

ColorPalette.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  maxCount: PropTypes.number,
  onChange: PropTypes.func,
  defaultColor: PropTypes.string,
  value: PropTypes.string,
  paletteStyles: PropTypes.shape({})
};

export default ColorPalette;
