import { View, Text, StatusBar } from "react-native";
import React, { useEffect } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming,
} from "react-native-reanimated";

const SIZE = 100.0;

const handleRotation = (progress) => {
    "worklet";
    return `${progress.value * 2 * Math.PI}rad`;
};

const SimpleAnimationScreen = () => {
    const progress = useSharedValue(1);
    const scale = useSharedValue(2);
    const color = useSharedValue("cyan");

    const reanimatedStyles = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            borderRadius: (progress.value * 100) / 2,
            transform: [
                { scale: scale.value },
                { rotate: handleRotation(progress) },
            ],
            backgroundColor: color.value,
        };
    }, []);

    useEffect(() => {
        progress.value = withRepeat(withSpring(0.5), -1, true);
        scale.value = withRepeat(withSpring(1), -1, true);
        color.value = withRepeat(
            withTiming("blue", { duration: 3000 }),
            -1,
            true
        );
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ marginTop: StatusBar.currentHeight }}>
                Simple Animation
            </Text>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Animated.View
                    style={[
                        {
                            width: SIZE,
                            height: SIZE,
                            backgroundColor: "#006D5B",
                        },
                        reanimatedStyles,
                    ]}
                ></Animated.View>
            </View>
        </View>
    );
};

export default SimpleAnimationScreen;
