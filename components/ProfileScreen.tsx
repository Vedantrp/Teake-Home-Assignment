import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Animated, Dimensions, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = 250;

const ProfileScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Overview' | 'Projects'>('Overview');
    const scrollY = new Animated.Value(0);

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT],
        extrapolate: 'clamp'
    });

    const profileOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
        outputRange: [1, 0.5, 0],
        extrapolate: 'clamp'
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}> 
                <Animated.Image source={{ uri: 'https://placekitten.com/800/400' }}
                    style={[styles.headerImage, { opacity: profileOpacity }]}
                />
            </Animated.View>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollY } } }
                ], { useNativeDriver: true })}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileTitle}>Software Engineer</Text>
                    <View style={styles.tabContainer}>
                        {(['Overview', 'Projects'] as const).map(tab => (
                            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                                <Text style={[styles.tabText, activeTab === tab && styles.activeTab]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.tabContent}>
                        {activeTab === 'Overview' ? (
                            <Text style={styles.tabDetails}>This is an overview of John Doe's work, experience, and skills.</Text>
                        ) : (
                            <Text style={styles.tabDetails}>Here are some of the projects John Doe has worked on.</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
            <StatusBar style='light' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8' },
    header: { position: 'absolute', width: '100%', height: HEADER_HEIGHT, backgroundColor: '#6200EE' },
    headerImage: { width: '100%', height: HEADER_HEIGHT, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
    scrollContainer: { paddingTop: HEADER_HEIGHT },
    contentContainer: { backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    profileName: { fontSize: 26, fontWeight: 'bold', color: '#333' },
    profileTitle: { color: 'gray', fontSize: 16 },
    tabContainer: { flexDirection: 'row', marginTop: 20, borderBottomWidth: 2, borderBottomColor: '#ddd' },
    tabText: { fontSize: 18, marginRight: 20, paddingBottom: 5, color: '#555' },
    activeTab: { fontWeight: 'bold', borderBottomWidth: 2, borderBottomColor: '#6200EE', color: '#6200EE' },
    tabContent: { marginTop: 20 },
    tabDetails: { fontSize: 16, color: '#444' }
});

export default ProfileScreen;
