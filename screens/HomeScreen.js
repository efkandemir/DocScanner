import { View, Text, StatusBar } from 'react-native'
import React from 'react'

export default function HomeScreen() {
    return (
        <View className="items-center flex-1 justify-center bg-blue-400">
            <Text>Welcome to Home Screen!</Text>
            <StatusBar style="auto" />
        </View>
    )
}
