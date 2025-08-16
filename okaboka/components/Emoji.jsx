import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Emoji = () => {
  const [selectedMood, setSelectedMood] = useState('Sad');

  const moods = [
    { name: 'Happy', emoji: '😊', color: '#FBBF24' },

    { name: 'Sad', emoji: '😔', color: '#FB923C' },
    { name: 'Romantic', emoji: '😘', color: '#FBBF24' },
    { name: 'Neutral', emoji: '😐', color: '#FBBF24' },
    { name: 'Excited', emoji: '🤩', color: '#FBBF24' }
  ];

  const currentMoodIndex = moods.findIndex(mood => mood.name === selectedMood);
  const currentMood = moods[currentMoodIndex];

  const getVisibleMoods = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentMoodIndex + i + moods.length) % moods.length;
      visible.push({
        ...moods[index],
        position: i,
        isCenter: i === 0
      });
    }
    return visible;
  };

  const navigateMood = (direction) => {
    const newIndex = direction === 'next'
      ? (currentMoodIndex + 1) % moods.length
      : (currentMoodIndex - 1 + moods.length) % moods.length;
    setSelectedMood(moods[newIndex].name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>How I'm Feeling Right Now</Text>

        {/* Main mood display */}
        <View style={styles.mainMoodContainer}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMood('prev')}
          >
            <AntDesign name="arrowleft" size={28} color="#757575" />
          </TouchableOpacity>

          <View style={styles.centerMoodContainer}>
            <View style={[styles.centerMoodCircle,]}>
              <Text style={styles.centerMoodEmoji}>{currentMood.emoji}</Text>
            </View>
            <View style={styles.moodInfo}>
              <Text style={styles.moodName}>{currentMood.name}</Text>
              <View style={styles.userCountContainer}>
                <Ionicons name="people" size={14} color="#6B7280" />
                <Text style={styles.userCount}>1.5k</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMood('next')}
          >
            <AntDesign name="arrowright" size={28} color="#757575" />
          </TouchableOpacity>
        </View>

        {/* Bottom mood options */}
        <View style={styles.bottomMoodsContainer}>
          {getVisibleMoods().map((mood, index) => {
            if (mood.isCenter) return <View key={`spacer-${index}`} style={styles.spacer} />;
            const fontSize = 35

            return (
              <TouchableOpacity
                key={`${mood.name}-${index}`}
                style={[
                  styles.bottomMoodCircle,
                  {
                    fontSize: fontSize,
                  }
                ]}
                onPress={() => setSelectedMood(mood.name)}
              >
                <Text style={[styles.bottomMoodEmoji, { fontSize }]}>
                  {mood.emoji}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Mood labels */}
        <View style={styles.labelsContainer}>
          {getVisibleMoods().map((mood, index) => {
            if (mood.isCenter) return <View key={`label-spacer-${index}`} style={styles.spacer} />;
            const fontSize = 14

            return (
              <Text
                key={`label-${mood.name}-${index}`}
                style={[
                  styles.moodLabel,
                  {
                    fontSize: fontSize,
                  }
                ]}
              >
                {mood.name}
              </Text>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#3DC4AB',
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 20,
  },
  card: {
    // backgroundColor: 'white',
    // borderRadius: 24,

    padding: 10,
    // width: width - 40,
    // maxWidth: 400,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 12,
    // elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    position: 'absolute',
    top: 10,
    right: 60,
  },
  mainMoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 30,

  },
  navButton: {
    marginHorizontal: 50,
    // padding: 8,
    borderRadius: 20,
  },
  centerMoodContainer: {
    // alignItems: 'center',
    marginHorizontal: 32,

  },
  centerMoodCircle: {
    // width: 80,
    // height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
  },
  centerMoodEmoji: {
    fontSize: 60,
  },
  moodInfo: {
    alignItems: 'center',
  },
  moodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    // marginBottom: 4,
  },
  userCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCount: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  bottomMoodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  bottomMoodCircle: {
    borderRadius: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  bottomMoodEmoji: {
    textAlign: 'center',
  },
  spacer: {
    width: 50,
    marginHorizontal: 8,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodLabel: {
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    width: 80,
  },
});

export default Emoji;