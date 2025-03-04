import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform } from 'react-native';

// Görüntüyü base64'e çevirme
export const convertImageToBase64 = async (uri) => {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    return `data:image/jpeg;base64,${base64}`;
};

// PDF oluştur ve göster
export const createAndShowPdf = async (imageUri) => {
    try {
        const base64Image = await convertImageToBase64(imageUri);
        const htmlContent = `
    <html>
        <body style="margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh;">
           <img src="${base64Image}" style="max-width: 90%; max-height: 90vh; object-fit: contain;" />

        </body>
    </html>
`;


        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        console.log("PDF oluşturuldu:", uri);

        if (Platform.OS === 'android') {
            const contentUri = await FileSystem.getContentUriAsync(uri);
            await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                data: contentUri,
                flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
                type: 'application/pdf',
            });
        } else {
            await Sharing.shareAsync(uri);
        }
    } catch (error) {
        console.error("PDF oluşturma hatası:", error);
    }
};
