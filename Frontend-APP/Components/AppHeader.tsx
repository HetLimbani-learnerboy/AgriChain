// AppHeader.tsx
import React, { useState } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function AppHeader() {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

    const handleOptionPress = (option: string) => {
        setDropdownVisible(false);
        console.log(option + ' selected');
    };

    return (
        <View style={styles.navbar}>
            <View style={styles.leftSection}>
                <Image
                    source={require('../assets/MainLogo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
                <Text style={styles.navTitle}>AgriChain</Text>
            </View>

            <View style={styles.rightSection}>
                <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
                    <Text style={styles.dropdownButtonText}>☰</Text>
                </TouchableOpacity>

                {dropdownVisible && (
                    <View style={styles.dropdownMenu}>
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => handleOptionPress('Transaction')}
                        >
                            <Text style={styles.dropdownItemText}>Transaction</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => handleOptionPress('Profile')}
                        >
                            <Text style={styles.dropdownItemText}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#eaf5ec',
        height: '12%',
        paddingHorizontal: screenWidth < 380 ? 16 : 24,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 10,
    },

    leftSection: {
        marginTop: '10%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    rightSection: {
        marginTop: '10%',
        position: 'relative',
    },

    logoImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 6,
    },

    navTitle: {
        fontSize: screenWidth < 380 ? 16 : 18,
        fontWeight: '900',
        color: 'black',
    },

    dropdownButton: {
        padding: 6,
    },

    dropdownButtonText: {
        fontSize: 26,
        color: '#1E2B21',
    },

    dropdownMenu: {
        position: 'absolute',
        top: 48,
        right: 0,
        width: 150,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1000,
    },

    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    },

    dropdownItemText: {
        fontSize: 16,
        color: 'black',
        fontWeight: '700',
    },
});
