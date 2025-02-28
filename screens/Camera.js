import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

function CameraScreen() {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const cameraRef = useRef(null); // Kamera referansı
    const [photoPath, setPhotoPath] = useState(null); // Çekilen fotoğrafı saklamak için

    useEffect(() => {
        // Kamera izni kontrolü
        if (!hasPermission) {
            requestPermission().then((granted) => {
                if (!granted) {
                    Alert.alert(
                        "İzin Gerekli",
                        "Kameraya erişim için izin vermeniz gerekiyor.",
                        [{ text: "Tamam", onPress: () => console.log("İzin reddedildi") }]
                    );
                }
            });
        }
    }, [hasPermission]);

    // 📸 Fotoğraf çekme fonksiyonu
    const takePhoto = async () => {
        if (!cameraRef.current) return;
        try {
            const photo = await cameraRef.current.takePhoto({
                flash: 'off',
            });
            setPhotoPath(photo.path);
            console.log("Fotoğraf çekildi:", photo.path);
            Alert.alert("Fotoğraf Çekildi", `Dosya yolu: ${photo.path}`);
        } catch (error) {
            console.error("Fotoğraf çekme hatası:", error);
        }
    };

    if (!hasPermission) return <Text className="text-white text-lg">Kamera izni bekleniyor...</Text>;
    if (device == null) return <Text className="text-red-500 text-lg">Kamera cihazı bulunamadı.</Text>;

    return (
        <View className="flex-1 items-center justify-center">
            {/* 📷 Kamera */}
            <Camera
                ref={cameraRef}
                className="absolute w-full h-full"
                device={device}
                isActive={true}
                photo={true} // Fotoğraf çekebilmek için gerekli
            />

            {/* 📸 Fotoğraf Çekme Butonu */}
            <TouchableOpacity className="absolute bottom-10 bg-white p-4 rounded-full" onPress={takePhoto}>
                <Text className="text-black font-bold text-lg">📷 Çek</Text>
            </TouchableOpacity>

            {/* Çekilen Fotoğrafı Göster */}
            {photoPath && (
                <Text className="absolute bottom-20 bg-black/50 text-white p-2">
                    Fotoğraf Yolu: {photoPath}
                </Text>
            )}
        </View>
    );
}

export default CameraScreen;
