
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { router, Tabs } from 'expo-router';

const { width } = Dimensions.get('window');

const PlusButton = ({ onPress }) => (
  <TouchableOpacity style={styles.plusButton} onPress={onPress}>
    <Text style={styles.plusText}>+</Text>
  </TouchableOpacity>
);

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {/* Plus Button positioned above tabs */}
      <View style={styles.plusButtonContainer}>
        <PlusButton onPress={() => router.push('/screens/Imageselect')} />
      </View>
      
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabItem}
            >
              <Text
                style={[
                  styles.tabLabel,
                  isFocused && styles.tabLabelActive
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Oka (You)",
        }}
      />
      <Tabs.Screen
        name="Bond"
        options={{
          title: "Bond",
        }}
      />
      <Tabs.Screen
        name="Okas"
        options={{
          title: "Oka's",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  plusButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: width / 2 - 25,
    zIndex: 10,
  },
  plusButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3DC4AB',
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  plusText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#3DC4AB',
    height: 50,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  tabLabelActive: {
    fontWeight: 'bold',
    color: '#fff',
  },
});