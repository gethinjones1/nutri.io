
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowRight, Dumbbell, Calendar, Salad } from 'lucide-react-native';

interface PlanCardProps {
  title: string;
  description: string;
  icon: 'workout' | 'nutrition' | 'calendar';
  onPress?: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  description,
  icon,
  onPress
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'workout':
        return <Dumbbell size={20} color="#6366f1" />;
      case 'nutrition':
        return <Salad size={20} color="#6366f1" />;
      case 'calendar':
        return <Calendar size={20} color="#6366f1" />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>View Details</Text>
        <ArrowRight size={16} color="#6366f1" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#ede9fe',
    borderRadius: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    alignSelf: 'flex-end',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366f1',
    marginRight: 4,
  },
});

export default PlanCard;
