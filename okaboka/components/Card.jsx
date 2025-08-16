// App.js - React Native Expo Photo Memory App
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Cardimage = () => {
  const [expandedDay, setExpandedDay] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const memoryDays = [
    {
      id: 1,
      date: "July 27, 2025",
      location: "Bataan, Philippines",
      emoji: "🤩",
      feelingText: "Feeling of the Day",
      description: "You spent time outdoors — surrounded by trees, sunlight, and the quiet rhythm of the city.",
      mainImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        'https://images.unsplash.com/photo-1507699622108-4be3abd695ad',
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6",
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
      ],
      previewImages: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6",
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=150&fit=crop"
      ]
    },
    {
      id: 2,
      date: "July 26, 2025",
      location: "Manila, Philippines",
      emoji: "😊",
      feelingText: "Adventure Day",
      description: "An amazing day exploring the city and capturing beautiful moments.",
      mainImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=400&h=300&fit=crop"
      ],
      previewImages: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=200&h=150&fit=crop",
        'https://images.unsplash.com/photo-1507699622108-4be3abd695ad',
          "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6",
          'https://images.unsplash.com/photo-1507699622108-4be3abd695ad',
      ]
    },
        {
      id: 3,
      date: "July 29, 2025",
      location: "Bataana, Philippines",
      emoji: "🤩",
      feelingText: "Feeling of the Day",
      description: "You spent time outdoors — surrounded by trees, sunlight, and the quiet rhythm of the city.",
      mainImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        'https://images.unsplash.com/photo-1507699622108-4be3abd695ad',
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6",
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
      ],
      previewImages: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6",
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=150&fit=crop"
      ]
    },
  ];

  const toggleExpand = (dayId) => {
    setExpandedDay(expandedDay === dayId ? null : dayId);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const renderMemoryDay = (day) => (
    <View key={day.id} style={styles.memoryCard}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.dateRow}>
          <View style={styles.dateLocationContainer}>
            <Text style={styles.dateText}>{day.date}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={16} color="#ef4444" />
              <Text style={styles.location}>{day.location}</Text>
            </View>
          </View>
          
          <View style={styles.feelingContainer}>
            <Text style={styles.emoji}>{day.emoji}</Text>
            <Text style={styles.feelingText}>{day.feelingText}</Text>
          </View>
          
          <Ionicons name="ellipsis-vertical" size={20} color="#9ca3af" />
        </View>  
      </View>
      
      <View style={styles.divider} />
      
      <Text style={styles.description}>{day.description}</Text>

      {/* Image Grid */}
      <View style={styles.imageContainer}>
        <View style={styles.mainImageRow}>
          {/* Left side images */}
          <View style={styles.sideImagesContainer}>
            {day.previewImages.slice(0, 2).map((img, idx) => (
              <TouchableOpacity 
                key={`left-${idx}`}
                onPress={() => openImageModal(img)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: img }} style={styles.sideImage} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.sideImagesContainer}>
            {day.previewImages.slice(2, 4).map((img, idx) => (
              <TouchableOpacity 
                key={`left-${idx}`}
                onPress={() => openImageModal(img)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: img }} style={styles.sideImage} />
              </TouchableOpacity>
            ))}
          </View>
          {/* Main image */}
          <TouchableOpacity 
            style={styles.mainImageContainer}
            onPress={() => openImageModal(day.mainImage)}
            activeOpacity={0.8}
          >
            <Image source={{ uri: day.mainImage }} style={styles.mainImage} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Best Moment of the day</Text>
            </View>
          </TouchableOpacity>
          
          {/* Right side images */}
          <View style={styles.sideImagesContainer}>
            {day.previewImages.slice(4, 6).map((img, idx) => (
              <TouchableOpacity 
                key={`right-${idx}`}
                onPress={() => openImageModal(img)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: img }} style={styles.sideImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Expanded Gallery */}
  {expandedDay === day.id && (
  <View style={styles.expandedGallery}>
    {/* First row with 4 images */}
    <View style={styles.bottomImageRow}>
      {day.galleryImages.slice(0, 4).map((img, idx) => (
        <TouchableOpacity 
          key={`bottom-${idx}`}
          onPress={() => openImageModal(img)}
          activeOpacity={0.8}
        >
          <Image source={{ uri: img }} style={styles.bottomImage} />
        </TouchableOpacity>
      ))}
    </View>
    
    {/* Second row with remaining images (up to 4) */}
    {day.galleryImages.length > 4 && (
      <View style={styles.bottomImageRow}>
        {day.galleryImages.slice(4, 8).map((img, idx) => (
          <TouchableOpacity 
            key={`bottom-${idx + 4}`}
            onPress={() => openImageModal(img)}
            activeOpacity={0.8}
          >
            <Image source={{ uri: img }} style={styles.bottomImage} />
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
)}

      {/* More Moments Button */}
      <TouchableOpacity 
        style={styles.moreButton}
        onPress={() => toggleExpand(day.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.moreButtonText}>
          {expandedDay === day.id ? 'Show Less' : `${day.galleryImages.length - 0} More Moments`}
        </Text>
        <Ionicons 
          name={expandedDay === day.id ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#6b7280" 
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {memoryDays.map(renderMemoryDay)}
        </ScrollView>

        {/* Image Modal */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeImageModal}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity 
              style={styles.modalBackground}
              onPress={closeImageModal}
              activeOpacity={1}
            >
              <View style={styles.modalContent}>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={closeImageModal}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={30} color="white" />
                </TouchableOpacity>
                
                {selectedImage && (
                  <Image 
                    source={{ uri: selectedImage }} 
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                )}
                
                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                    <Ionicons name="heart-outline" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                    <Ionicons name="share-outline" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                    <Ionicons name="download-outline" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#ffffffff',
  },
  // scrollView: {
  //   flex: 1,
  // },
  scrollContent: {
  paddingTop:20,
    paddingBottom: 10,
  },
  memoryCard: {
      paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    paddingBottom: 10,
    borderWidth:1,
    shadowColor: '#3a3a3aff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    padding: 15,
    paddingBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#9c9c9cff',

    marginBottom: 12,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dateLocationContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  location: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 4,
  },
  feelingContainer: {
    alignItems: 'center',
   marginRight:30,
  },
  emoji: {
    marginTop:-7,
    fontSize: 24,
  },
  feelingText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  description: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  imageContainer: {
    paddingHorizontal: 8,
  },
  mainImageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 8,
  },
  mainImageContainer: {
    marginHorizontal: 4,
    position: 'relative',
  },
  mainImage: {
    width: width * 0.21,
    height: width * 0.42,
    borderRadius: 12,
  },
  sideImagesContainer: {
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
  sideImage: {
    width: width * 0.20,
    height: width * 0.20,
    borderRadius: 10,
    marginBottom: 8,
  },
  badge: {
    position: 'absolute',
    bottom: 8,
    // left: 8,
    // right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  expandedGallery: {
    paddingHorizontal: 8,
  },
  bottomImageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bottomImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 10,
  },
  moreButton: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 10,
  },
  moreButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  modalImage: {
    width: width,
    height: height * 0.7,
  },
  modalActions: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 24,
    marginHorizontal: 12,
  },
});

export default Cardimage;