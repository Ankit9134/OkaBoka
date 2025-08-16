import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function CameraUpload() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState('back');
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
  const [uploading, setUploading] = useState(false);
  const [showCamera, setShowCamera] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [activeMode, setActiveMode] = useState('image'); // 'image' or 'video'
  const [recordingDuration, setRecordingDuration] = useState(0);
  const cameraRef = useRef(null);
  const recordingTimer = useRef(null);

  useEffect(() => {
    (async () => {
      // Request camera and audio permissions
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== 'granted') {
        Alert.alert('Permission needed', 'Camera permission is required to take photos/videos');
      }
      if (audioStatus !== 'granted') {
        Alert.alert('Permission needed', 'Microphone permission is required to record videos');
      }
      if (galleryStatus !== 'granted') {
        Alert.alert('Permission needed', 'Gallery permission is required to select media');
      }
      
      setHasPermission(cameraStatus === 'granted');
    })();
  }, []);

  useEffect(() => {
    return () => {
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
    };
  }, []);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecordingTimer = () => {
    setRecordingDuration(0);
    recordingTimer.current = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
  };

  const stopRecordingTimer = () => {
    if (recordingTimer.current) {
      clearInterval(recordingTimer.current);
      recordingTimer.current = null;
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setMedia(photo.uri);
        setMediaType('image');
        setShowCamera(false);
        uploadMedia(photo.uri, 'image');
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const recordVideo = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        setIsRecording(true);
        startRecordingTimer();
        
        const video = await cameraRef.current.recordAsync({
          quality: '720p',
          maxDuration: 60, // 60 seconds max
        });
        
        setMedia(video.uri);
        setMediaType('video');
        setShowCamera(false);
        uploadMedia(video.uri, 'video');
      } catch (error) {
        console.error('Error recording video:', error);
        Alert.alert('Error', 'Failed to record video');
      } finally {
        setIsRecording(false);
        stopRecordingTimer();
        setRecordingDuration(0);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try {
        await cameraRef.current.stopRecording();
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }
  };

  const pickMedia = async () => {
    try {
      const mediaTypes = activeMode === 'video' 
        ? ImagePicker.MediaTypeOptions.Videos 
        : ImagePicker.MediaTypeOptions.Images;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes,
        allowsEditing: true,
        aspect: activeMode === 'image' ? [3, 4] : [16, 9],
        quality: 0.8,
        videoMaxDuration: 60,
      });

      if (!result.canceled) {
        const selectedMedia = result.assets[0];
        setMedia(selectedMedia.uri);
        setMediaType(selectedMedia.type === 'video' ? 'video' : 'image');
        setShowCamera(false);
        uploadMedia(selectedMedia.uri, selectedMedia.type === 'video' ? 'video' : 'image');
      }
    } catch (error) {
      console.error('Error picking media:', error);
      Alert.alert('Error', 'Failed to pick media');
    }
  };

  const uploadMedia = async (uri, type) => {
    setUploading(true);
    
    try {
      // Replace with your actual API endpoint
      const apiUrl = 'https://your-api-endpoint.com/upload';
      
      // Get file info
      const fileInfo = await FileSystem.getInfoAsync(uri);
      
      // Create form data
      const formData = new FormData();
      const fileExtension = type === 'video' ? 'mp4' : 'jpg';
      const mimeType = type === 'video' ? 'video/mp4' : 'image/jpeg';
      
      formData.append('file', {
        uri,
        name: `${type}_${Date.now()}.${fileExtension}`,
        type: mimeType,
      });

      // Simulate upload process (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Uncomment for actual upload
      /*
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const data = await response.json();
      */
      
      Alert.alert('Success', `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`);
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', `Failed to upload ${type}. Please try again.`);
    } finally {
      setUploading(false);
    }
  };

  const resetCamera = () => {
    setMedia(null);
    setMediaType(null);
    setShowCamera(true);
    setUploading(false);
    setIsRecording(false);
    stopRecordingTimer();
    setRecordingDuration(0);
  };

  const toggleCameraType = () => {
    setType(current => current === 'back' ? 'front' : 'back');
  };

  const handleCapturePress = () => {
    if (activeMode === 'image') {
      takePicture();
    } else {
      if (isRecording) {
        stopRecording();
      } else {
        recordVideo();
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>No access to camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={() => Camera.requestCameraPermissionsAsync()}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={resetCamera}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        {/* Recording indicator */}
        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>{formatDuration(recordingDuration)}</Text>
          </View>
        )}
      </View>

      {/* Camera/Media Area */}
      <View style={styles.cameraContainer}>
        {showCamera && !media ? (
          <Camera
            style={styles.camera}
            type={type}
            ref={cameraRef}
          >
            {uploading && (
              <View style={styles.uploadOverlay}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.uploadText}>Uploading...</Text>
              </View>
            )}
          </Camera>
        ) : (
          <View style={styles.mediaContainer}>
            {media && mediaType === 'image' && (
              <Image source={{ uri: media }} style={styles.previewImage} />
            )}
            {media && mediaType === 'video' && (
              <View style={styles.videoPreview}>
                <Ionicons name="play-circle" size={80} color="white" />
                <Text style={styles.videoText}>Video Ready</Text>
                <Text style={styles.videoSubText}>Tap to play after upload</Text>
              </View>
            )}
            {uploading && (
              <View style={styles.uploadOverlay}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.uploadText}>Uploading...</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <View style={styles.controlsRow}>
          {/* Gallery Button */}
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={pickMedia}
            disabled={uploading || isRecording}
          >
            <Ionicons 
              name={activeMode === 'video' ? 'videocam' : 'images'} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>

          {/* Capture Button */}
          <TouchableOpacity
            style={[
              styles.captureButton,
              isRecording && styles.recordingCaptureButton
            ]}
            onPress={handleCapturePress}
            disabled={uploading}
          >
            <View style={[
              styles.captureButtonInner,
              isRecording && styles.recordingCaptureButtonInner
            ]} />
          </TouchableOpacity>

          {/* Flip Camera Button */}
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraType}
            disabled={uploading || isRecording}
          >
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Mode Selector */}
        <View style={styles.modeSelector}>
          <TouchableOpacity 
            onPress={() => setActiveMode('image')}
            disabled={isRecording}
          >
            <Text style={[
              styles.modeText, 
              activeMode === 'image' && styles.activeMode
            ]}>
              Photo
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setActiveMode('video')}
            disabled={isRecording}
          >
            <Text style={[
              styles.modeText, 
              activeMode === 'video' && styles.activeMode
            ]}>
              Video
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Success Message */}
      {media && !uploading && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>
            {mediaType?.charAt(0).toUpperCase() + mediaType?.slice(1)} uploaded successfully!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginRight: 8,
  },
  recordingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  camera: {
    flex: 1,
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  previewVideo: {
    width: '100%',
    height: '100%',
  },
  videoPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  videoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  videoSubText: {
    color: '#999',
    fontSize: 14,
    marginTop: 8,
  },
  uploadOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  bottomControls: {
    backgroundColor: '#000',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  galleryButton: {
    width: 56,
    height: 56,
    backgroundColor: '#333',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ccc',
  },
  recordingCaptureButton: {
    backgroundColor: '#ff4444',
    borderColor: '#ff0000',
  },
  captureButtonInner: {
    width: 68,
    height: 68,
    backgroundColor: 'white',
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#999',
  },
  recordingCaptureButtonInner: {
    width: 28,
    height: 28,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  flipButton: {
    width: 56,
    height: 56,
    backgroundColor: '#333',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeText: {
    color: '#666',
    fontSize: 16,
    marginHorizontal: 24,
    paddingVertical: 8,
  },
  activeMode: {
    color: 'white',
    fontWeight: '600',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  successMessage: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  successText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});