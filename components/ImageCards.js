import { View, Text, Image } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ImageCards({ props }) {
    return (
        <View className="border border-gray-700 w-32 h-28 items-center justify-center rounded-lg">
            {props == 'Camera' ? (
                <FontAwesome name="camera" size={24} color="black" />
            ) : <FontAwesome name="picture-o" size={24} color="black" />}
        </View>
    )
}