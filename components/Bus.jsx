import React, { useEffect, useRef } from 'react';
import { Animated} from 'react-native';

function Bus() {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {

    const glowing = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1, 
          duration: 1000, // 1 second
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5, 
          duration: 1000, 
          useNativeDriver: true,
        }),
      ])
    );

    glowing.start();

    return () => glowing.stop(); // Cleanup animation on unmount
  }, [opacity]);

  return (
    <Animated.View
      style={{
        height: 20,
        width: 20,
        backgroundColor: "red",
        borderRadius: 20,
        opacity, // Bind animated opacity value
      }}
    />
  );
}

export default Bus;

