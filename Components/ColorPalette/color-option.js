import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native'
import { useState } from 'react';
import Icon from './icon';

const { width } = Dimensions.get('window');

const ColorOption = (props) => {
  const { icon, color, count, addSelected, subtractSelected, scaleToWindow } = props;
  let scaledWidth = width * .025;
  const [isSelected, setSelect] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        if(isSelected == false && count < 3) {
          setSelect(true)
          addSelected(color);
        } else if(count == 3 && isSelected != true) {
          setSelect(false)
        } else if (isSelected == true){
          setSelect(false)
          subtractSelected(color);
        }

      }}
      style={[
        styles.colorOption,
        { backgroundColor: color },
        scaleToWindow && {
          width: width * .07,
          height: width * .07,
          marginHorizontal: scaledWidth,
          marginVertical: scaledWidth,
          borderRadius: scaledWidth * 2
        }
      ]}
    >
      {isSelected ? <Icon color={color} icon={icon} /> : <Text></Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  colorOption: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 25,
    elevation: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: .25,
  }
});

ColorOption.propTypes = {
  icon: PropTypes.node,
  color: PropTypes.string.isRequired,
  scaleToWindow: PropTypes.bool.isRequired,
  addSelected: PropTypes.func.isRequired,
}

export default ColorOption;