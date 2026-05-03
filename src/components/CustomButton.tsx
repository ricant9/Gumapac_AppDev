import React from 'react';
import { Text, TouchableOpacity, View, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  label: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ containerStyle, textStyle, label, onPress }) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <Text style={textStyle}>{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;