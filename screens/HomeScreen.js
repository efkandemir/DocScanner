import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import ImageCards from '../components/ImageCards'

export default function HomeScreen() {
    const [isfavpdf, setIsfavpdf] = useState(false)
    const [ispdf, setIspdf] = useState(false)

    return (
        <SafeAreaView className="items-center flex-1 justify-start bg-blue-400">
            <View className="mt-6">
                <Text className="text-base items-start mt-4 font-semibold">Document Scanner</Text>
            </View>
            <View className="flex-row p-1">
                <TouchableOpacity
                    className="m-2">
                    <ImageCards props={'Gallery'} />
                </TouchableOpacity>
                <TouchableOpacity
                    className="m-2"
                >
                    <ImageCards props={'Camera'} />
                </TouchableOpacity>
            </View>

            <View className="h-[1px] w-full bg-black" />
            <View className="w-full h-[250px] items-center justify-center">
                <Text className="self-start ml-4 absolute top-4">Favorites</Text>
                {isfavpdf ? (
                    <Text>Efkan</Text>
                ) : (
                    <Text className="text-center">Favori Pdf Bulunamadı</Text>
                )}
            </View>
            <View className="h-[1px] w-full bg-black" />
            <View className="items-center justify-center w-full h-[355px]">
                <Text className="self-start ml-2 absolute top-4">All Projects</Text>
                {ispdf ? (
                    <Text>Pdf Var</Text>
                ) : (<Text>Pdf Yok</Text>)}
            </View>

        </SafeAreaView>
    )
}
