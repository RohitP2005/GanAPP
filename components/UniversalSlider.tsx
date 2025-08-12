import React from 'react';
import { Platform, View } from 'react-native';
import Slider from '@react-native-community/slider';

const UniversalSlider = ({ value, onValueChange, minimumValue, maximumValue, step, style }) => {
  if (Platform.OS === 'web') {
    return (
      <View style={style}>
        <input
          type="range"
          min={minimumValue}
          max={maximumValue}
          step={step}
          value={value}
          onChange={(e) => onValueChange(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </View>
    );
  }

  return (
    <Slider
      value={value}
      onValueChange={onValueChange}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      style={style}
    />
  );
};

export default UniversalSlider;

