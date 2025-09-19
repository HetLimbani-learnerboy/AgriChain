// AppHeader.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import i18n from '../i18n';
const { width: screenWidth } = Dimensions.get('window');

export default function AppHeader() {
  const [menuVisible, setMenuVisible] = useState(false); // burger menu
  const [settingsVisible, setSettingsVisible] = useState(false); // settings menu

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const toggleSettings = () => setSettingsVisible(!settingsVisible);

  const handleMenuOption = (option: string) => {
    console.log(option + ' selected');
    setMenuVisible(false);
  };
const handleOptionPress = (option: string) => { console.log(option + ' selected'); };
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setSettingsVisible(false);
  };

  return (
    <View style={styles.navbar}>
    
      {/* Logo + App Title */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/MainLogo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.navTitle}>{i18n.t('AgriChain')}</Text>
      </View>
      
      
      {/* Burger menu */}
<View style={{ position: 'relative' }}>
  <TouchableOpacity onPress={toggleMenu} style={styles.burgerButton}>
    <Text style={styles.burgerText}>☰</Text>
  </TouchableOpacity>

  {/* Burger Menu Dropdown */}
  {menuVisible && (
    <View style={[styles.dropdownMenu, { top: 60 }]}>
      <TouchableOpacity style={styles.dropdownItem} onPress={() => handleOptionPress('Transaction')}>
        <Text style={styles.dropdownItemText}>Transaction</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dropdownItem} onPress={() => handleOptionPress('Profile')}>
        <Text style={styles.dropdownItemText}>Profile</Text>
      </TouchableOpacity>
    </View>
  )}
</View>


      {/* Settings Icon */}
      <View >
        <TouchableOpacity onPress={toggleSettings} style={styles.settingsButton}>
          <Image 
            source={require('../assets/Images/settings.png')}
            style={styles.settingsIcon} 
          />
        </TouchableOpacity>

        {settingsVisible && (
          <View style={styles.dropdownMenu}>
            <Text style={styles.dropdownTitle}>Select Language</Text>
            <View style={styles.langButtons}>
              <TouchableOpacity style={styles.langButton} onPress={() => changeLanguage("en")}>
                <Text style={styles.langButtonText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.langButton} onPress={() => changeLanguage("hi")}>
                <Text style={styles.langButtonText}>हिंदी</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.langButton} onPress={() => changeLanguage("gu")}>
                <Text style={styles.langButtonText}>ગુજરાતી</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 85,
    backgroundColor: '#eaf5ecff',
    flexDirection: 'row',
    alignItems: 'flex-end',
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop:5,
    color: '#3d9369ff',
    marginBottom: 4, 
    marginLeft: 0, 
  },
  dropdownButton: {
    marginTop:25,
    marginLeft:165,
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
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownTitle: { fontSize: 14, fontWeight: '600', color: '#2d4232ff', textAlign: 'center', marginBottom: 6 },
  dropdownItemText: { fontSize: 16, color: '#2d4232ff', },
  dropdownItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#ddd', },
  langButtons: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, paddingVertical: 4 },
  langButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, backgroundColor: '#3d9369ff', width: '80%', alignItems: 'center' },
  langButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  menuItem: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginVertical: 2, backgroundColor: '#bde0c4ff' },
  menuText: { fontSize: 14, color: '#1E2B21', fontWeight: '500', textAlign: 'center' },
  burgerText: { fontSize: 28, fontWeight: 'bold' },
  settingsButton: {
    padding: 8,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  burgerButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  settingsIcon: {
    width: 28,
    height: 28,
    
  },
});