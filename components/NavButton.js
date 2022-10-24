import { Text, View, TouchableOpacity, Animated } from "react-native";
import { navBarStyles } from "../styles/styles";
import Icon from "react-native-ico-material-design";
import { Constants } from "../utils/Constants";

export const NavButton = (props) => {
  //Animation

  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({ inputRange, outputRange });

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  // End of animations

  return (
    <TouchableOpacity
      style={[
        props.screen == props.page
          ? navBarStyles.activeButton
          : navBarStyles.navButton,
      ]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={0.7}
      onPress={() => {
        props.changePage(props.page);
        //ANIMATION
      }}
    >
      <Animated.View style={[{ transform: [{ scale }] }]}>
        <Icon
          style={[
            navBarStyles.icon,
            props.screen == props.page ? { fill: "white" } : { fill: "black" },
          ]}
          name={props.name}
          group={props.group}
        />
        <Text
          style={[
            props.screen == props.page
              ? { color: "white" }
              : { color: "black" },
          ]}
        >
          {props.title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};