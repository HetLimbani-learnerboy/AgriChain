// AppHeader.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
const { width: screenWidth } = Dimensions.get('window');

export default function AppHeader() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionPress = (option: string) => {
    setDropdownVisible(false);
    console.log(option + ' selected');
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.navTitle}>AgriChain</Text>

      <View>
        <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
          <Text style={styles.dropdownButtonText}>☰</Text>
        </TouchableOpacity>

        {dropdownVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleOptionPress('Profile')}
            >
              <Text style={styles.dropdownItemText}>Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleOptionPress('Transaction')}
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
    height: 70,
    backgroundColor: '#eaf5ecff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenWidth < 400 ? 20 : 24,
    paddingVertical:8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop:18,
    color: '#3d9369ff',
  },
  dropdownButton: {
    marginTop:12,
    padding: 8,
    
  },
  dropdownButtonText: {
    fontSize: 24,
    color: '#1E2B21',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 130,
    backgroundColor: '#dfebe1ff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#2d4232ff',
  },
});
