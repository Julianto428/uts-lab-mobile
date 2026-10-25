import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import InfoCard from '../components/InfoCard';

const DAFTAR_MAHASISWA = [
  { id: '1', nama: 'Alifia Putri', prodi: 'Sistem Informasi' },
  { id: '2', nama: 'Budi Santoso', prodi: 'Teknologi Informasi' },
  { id: '3', nama: 'Citra Dewi', prodi: 'Sistem Informasi' },
  { id: '4', nama: 'Dimas Anggara', prodi: 'Teknik Informatika' },
  { id: '5', nama: 'Eka Nur Safitri', prodi: 'Sistem Informasi' },
];

export default function IndexScreen() {
  const [keyword, setKeyword] = useState<string>('');
  
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: ''
  });

  const showAlert = (title: string, message: string) => {
    setAlertConfig({ visible: true, title, message });
  };

  const closeAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  const filteredMahasiswa = DAFTAR_MAHASISWA.filter((item) =>
    item.nama.toLowerCase().includes(keyword.toLowerCase()) ||
    item.prodi.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleCardPress = (title: string) => {
    showAlert('Modul Praktikum', `Anda membuka:\n${title}`);
  };

  const handleStudentPress = (student: typeof DAFTAR_MAHASISWA[0]) => {
    showAlert('Profil Mahasiswa', `Nama: ${student.nama}\nProdi: ${student.prodi}`);
  };

  const ListHeader = () => (
    <View style={styles.headerContentContainer}>
      <View style={styles.locationHeader}>
        <Text style={styles.locationTitle}>PORTAL PRAKTIKUM,</Text>
        <Text style={styles.locationSubtitle}>Universitas Internasional Batam</Text>
        <Text style={styles.dateText}>Semester Ganjil 2026/2027</Text>
      </View>

      <View style={styles.heroCardBlue}>
        <View style={styles.heroHeader}>
          <Ionicons name="laptop-outline" size={32} color="#FFFFFF" />
          <Text style={styles.heroTemp}>2/10</Text>
        </View>
        <Text style={styles.heroDesc}>Modul Selesai</Text>
        <Text style={styles.heroSubDesc}>Mobile Computing</Text>
      </View>

      <Text style={styles.sectionTitle}>Tugas Praktikum</Text>
      
      <InfoCard
        title="Environment Setup & Expo"
        subtitle="Instalasi Node.js dan Expo Go"
        status="selesai"
        onPress={() => handleCardPress('Modul 1: Environment Setup')}
      />
      <InfoCard
        title="Component Architecture"
        subtitle="Membuat Reusable Component"
        status="proses"
        onPress={() => handleCardPress('Modul 2: Component Architecture')}
      />

      <View style={styles.directoryHeaderRow}>
        <Text style={styles.sectionTitle}>Direktori Mahasiswa</Text>
        <TouchableOpacity onPress={() => showAlert('Info', 'Menampilkan semua mahasiswa di direktori.')}>
          <Text style={styles.seeAllText}>Lihat Semua {'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8FA1B4" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari mahasiswa..."
          placeholderTextColor="#8FA1B4"
          value={keyword}
          onChangeText={setKeyword}
        />
        {keyword.length > 0 && (
          <TouchableOpacity onPress={() => setKeyword('')} style={styles.clearBtn}>
            <Ionicons name="close-circle" size={20} color="#8FA1B4" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Top Nav Bar */}
      <View style={styles.topNavBar}>
        <TouchableOpacity onPress={() => showAlert('Menu', 'Navigasi drawer belum tersedia.')}>
          <Ionicons name="menu-outline" size={28} color="#2C3E50" />
        </TouchableOpacity>
        <View style={styles.rightNavIcons}>
          <TouchableOpacity onPress={() => showAlert('Notifikasi', 'Belum ada pemberitahuan baru saat ini.')} style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={24} color="#2C3E50" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showAlert('Profil Pengguna', 'Anda login sebagai Julianto (JL).')}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>JL</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* FlatList */}
      <FlatList
        data={filteredMahasiswa}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="sad-outline" size={48} color="#CBD5E1" style={{ marginBottom: 12 }} />
            <Text style={styles.emptyText}>Data tidak ditemukan!</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.listItem} 
            onPress={() => handleStudentPress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.avatarIcon}>
              <Ionicons name="person" size={20} color="#74A4FC" />
            </View>
            <View style={styles.listTextContainer}>
              <Text style={styles.listName}>{item.nama}</Text>
              <Text style={styles.listProdi}>{item.prodi}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
          </TouchableOpacity>
        )}
      />

      {/* CUSTOM ALERT MODAL - Menimpa Alert.alert bawaan */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={alertConfig.visible}
        onRequestClose={closeAlert}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="information-circle" size={36} color="#74A4FC" />
            </View>
            <Text style={styles.modalTitle}>{alertConfig.title}</Text>
            <Text style={styles.modalMessage}>{alertConfig.message}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeAlert} activeOpacity={0.8}>
              <Text style={styles.modalButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  rightNavIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginRight: 16,
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 10,
    height: 10,
    backgroundColor: '#74A4FC',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#F4F7FC',
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D97706', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContent: {
    padding: 24,
    paddingBottom: 40,
  },
  headerContentContainer: {
    marginBottom: 8,
  },
  locationHeader: {
    marginBottom: 24,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2C3E50',
    letterSpacing: 1,
  },
  locationSubtitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2C3E50',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 13,
    color: '#8FA1B4',
    fontWeight: '500',
  },
  heroCardBlue: {
    backgroundColor: '#74A4FC',
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#74A4FC',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heroTemp: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroDesc: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroSubDesc: {
    fontSize: 14,
    color: '#E0EAFF',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2C3E50',
    marginBottom: 16,
  },
  directoryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#74A4FC',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 20,
    shadowColor: '#8FA1B4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#2C3E50',
    fontWeight: '500',
  },
  clearBtn: {
    padding: 4,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#8FA1B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  listTextContainer: {
    flex: 1,
  },
  listName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },
  listProdi: {
    fontSize: 13,
    color: '#8FA1B4',
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#8FA1B4',
    fontWeight: '700',
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(23, 37, 52, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#2C3E50',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 15,
    color: '#8FA1B4',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
    fontWeight: '500',
  },
  modalButton: {
    backgroundColor: '#74A4FC',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});