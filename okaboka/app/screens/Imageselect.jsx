import React, { useState } from 'react';
import { Button, Image, View, Platform, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Request permissions when component mounts
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        
        if (galleryStatus !== 'granted') {
          Alert.alert('Sorry, we need gallery permissions to make this work!');
        }
        if (cameraStatus !== 'granted') {
          Alert.alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    
    try {
      // Replace with your actual API endpoint
      const apiUrl = 'https://your-api-endpoint.com/upload';
      
      // Get file info
      const fileInfo = await FileSystem.getInfoAsync(uri);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: fileInfo.uri.split('/').pop(),
        type: 'image/jpeg',
      });

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      Alert.alert('Success', 'Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      // Alert.alert('Error', 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button 
          title="Pick from Gallery" 
          onPress={pickImage} 
          disabled={uploading}
        />
        <View style={styles.buttonSpacer} />
        <Button 
          title="Take Photo" 
          onPress={takePhoto} 
          disabled={uploading}
        />
      </View>
      
      {uploading && (
        <View style={styles.uploadingContainer}>
          <ActivityIndicator size="large" color="#3DC4AB" />
        </View>
      )}
      
      {image && (
        <Image 
          source={{ uri: image }} 
          style={styles.image} 
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonSpacer: {
    width: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
  uploadingContainer: {
    marginVertical: 20,
  },
});