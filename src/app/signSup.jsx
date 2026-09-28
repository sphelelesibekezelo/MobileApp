import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Reusable Input Field Component with Password Toggle support
const InputField = ({ 
  label, 
  placeholder, 
  iconName, 
  value, 
  onChangeText, 
  keyboardType,
  isPassword = false,
  isPasswordVisible = false,
  onTogglePassword = null
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label} <Text style={styles.required}>*</Text></Text>
    <View style={styles.inputWrapper}>
      <Ionicons name={iconName} size={18} color="#4A5568" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#718096"
        secureTextEntry={isPassword && !isPasswordVisible}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {isPassword && (
        <TouchableOpacity onPress={onTogglePassword}>
          <Ionicons 
            name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
            size={20} 
            color="#4A5568" 
          />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default function SignSup() {
  const router = useRouter();
  
  // Form State
  const [staffNo, setStaffNo] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [cellNumber, setCellNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Password Visibility State
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Top Banner Image */}
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop' }} 
            style={styles.bannerImage} 
          />

          <View style={styles.formContainer}>
            
            {/* Header */}
            <Text style={styles.portalAccess}>
              <Ionicons name="shield-outline" size={12} color="#1E3A8A" /> FACULTY ACCESS
            </Text>
            <Text style={styles.title}>Supervisor Registration</Text>
            <Text style={styles.subtitle}>
              Provide your staff details to join the portal.
            </Text>

            {/* Role Tabs (Swapped active state) */}
            <View style={styles.roleTabs}>
              
              {/* Student Tab -> Navigates to signStud.jsx */}
              <TouchableOpacity 
                style={styles.tabButton} 
                onPress={() => router.push('/signStud')}
              >
                <Ionicons name="person-outline" size={16} color="#718096" style={styles.tabIcon} />
                <Text style={styles.inactiveTabText}>Student/Assistant</Text>
              </TouchableOpacity>
              
              {/* Supervisor Tab (Currently Active) */}
              <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
                <Ionicons name="people-outline" size={16} color="#1E3A8A" style={styles.tabIcon} />
                <Text style={styles.activeTabText}>Supervisor</Text>
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <InputField 
              label="Staff No." 
              placeholder="e.g. STF-882910" 
              iconName="id-card-outline" 
              value={staffNo} 
              onChangeText={setStaffNo} 
            />
            <InputField 
              label="Name" 
              placeholder="Jane" 
              iconName="person-outline" 
              value={name} 
              onChangeText={setName} 
            />
            <InputField 
              label="Surname" 
              placeholder="Smith" 
              iconName="person-outline" 
              value={surname} 
              onChangeText={setSurname} 
            />
            <InputField 
              label="University email" 
              placeholder="jane.smith@university.edu" 
              iconName="mail-outline" 
              keyboardType="email-address" 
              value={email} 
              onChangeText={setEmail} 
            />
            <InputField 
              label="Cellphone number" 
              placeholder="+1 (555) 000-0000" 
              iconName="call-outline" 
              keyboardType="phone-pad" 
              value={cellNumber} 
              onChangeText={setCellNumber} 
            />
            
            {/* Password Fields */}
            <InputField 
              label="Password" 
              placeholder="Enter your password" 
              iconName="lock-closed-outline" 
              isPassword={true}
              isPasswordVisible={isPasswordVisible}
              onTogglePassword={() => setIsPasswordVisible(!isPasswordVisible)}
              value={password} 
              onChangeText={setPassword} 
            />
            <InputField 
              label="Confirm Password" 
              placeholder="Confirm your password" 
              iconName="lock-closed-outline" 
              isPassword={true}
              isPasswordVisible={isConfirmPasswordVisible}
              onTogglePassword={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              value={confirmPassword} 
              onChangeText={setConfirmPassword} 
            />

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitText}>Complete Registration</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={styles.submitIcon} />
            </TouchableOpacity>

            {/* Terms Text */}
            <Text style={styles.termsText}>
              By clicking "Complete Registration", you agree to the EduRegister Portal <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={24} color="#1E3A8A" style={styles.infoIcon} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Need help with registration?</Text>
              <Text style={styles.infoDesc}>
                If you encounter any issues with the institutional verification or cannot find your department, please <Text style={styles.linkText}>reach out to our faculty support desk</Text>.
              </Text>
            </View>
          </View>

          {/* Footer Link -> Navigates to logIn.jsx */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/logIn')}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  bannerImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  formContainer: {
    padding: 20,
  },
  portalAccess: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E3A8A',
    letterSpacing: 0.5,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
    marginBottom: 24,
  },
  roleTabs: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inactiveTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
    marginLeft: 6,
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A8A',
    marginLeft: 6,
  },
  tabIcon: {
    marginRight: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 6,
  },
  required: {
    color: '#E53E3E',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A9C4E3',
    borderRadius: 6,
    paddingHorizontal: 16,
    height: 50,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A202C',
    height: '100%',
  },
  submitButton: {
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 6,
    marginTop: 10,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitIcon: {
    marginLeft: 8,
  },
  termsText: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },
  linkText: {
    color: '#1E3A8A',
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F0F7FF',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 13,
    color: '#4A5568',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 15,
    color: '#4A5568',
  },
  signInLink: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
});