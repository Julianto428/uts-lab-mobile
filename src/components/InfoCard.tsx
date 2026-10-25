import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface InfoCardProps {
  title: string;
  status: string;
  onPress: () => void;
  subtitle?: string;
}

export default function InfoCard({ title, status, onPress, subtitle }: InfoCardProps) {
  const isSelesai = status?.toLowerCase() === 'selesai';

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText} numberOfLines={2}>{title}</Text>
          {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        </View>
        <View style={[styles.badge, isSelesai ? styles.badgeSelesai : styles.badgeProses]}>
          <Ionicons 
            name={isSelesai ? "checkmark-circle" : "time"} 
            size={14} 
            color={isSelesai ? "#046C4E" : "#B45309"} 
            style={{ marginRight: 4 }}
          />
          <Text style={[styles.badgeText, isSelesai ? styles.textSelesai : styles.textProses]}>
            {status.toUpperCase()}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={onPress} 
        activeOpacity={0.7}
      >
        <Text style={styles.actionButtonText}>Lihat Detail</Text>
        <Ionicons name="arrow-forward" size={16} color="#74A4FC" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24, // Sudut membulat seperti referensi
    padding: 20,
    marginBottom: 16,
    shadowColor: '#8FA1B4', // Shadow lembut
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleWrapper: {
    flex: 1,
    paddingRight: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2C3E50',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 13,
    color: '#8FA1B4',
    fontWeight: '500',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeSelesai: {
    backgroundColor: '#DEF7EC',
  },
  badgeProses: {
    backgroundColor: '#FEF08A',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  textSelesai: {
    color: '#046C4E',
  },
  textProses: {
    color: '#B45309',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F5FF',
    paddingVertical: 12,
    borderRadius: 16,
  },
  actionButtonText: {
    color: '#74A4FC',
    fontSize: 13,
    fontWeight: '700',
    marginRight: 8,
  },
});