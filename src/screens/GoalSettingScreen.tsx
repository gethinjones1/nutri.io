import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    Dimensions,
    Animated,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    Zap,
    BookOpen,
    Brain,
    Sparkles,
    ArrowRight
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useToast } from '../components/ui/toast';
import MaskedView from '@react-native-masked-view/masked-view';

const { width, height } = Dimensions.get('window');

const GoalSettingScreen = () => {
    const [goal, setGoal] = useState('');
    const [showExamples, setShowExamples] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const navigation = useNavigation();
    const { toast } = useToast();

    const categories = [
        {
            icon: <Zap size={24} color="#FF6B6B" />,
            name: 'Fitness',
            description: 'Physical health goals'
        },
        {
            icon: <Brain size={24} color="#4ECDC4" />,
            name: 'Learning',
            description: 'Skill development'
        },
        {
            icon: <BookOpen size={24} color="#FFA726" />,
            name: 'Personal Growth',
            description: 'Mental wellness'
        }
    ];

    const exampleGoals = {
        Fitness: [
            "Lose 15 pounds and build lean muscle",
            "Run a half marathon in under 2 hours",
            "Complete 50 consecutive push-ups"
        ],
        Learning: [
            "Learn Python programming and build a web app",
            "Master Spanish to conversational level",
            "Complete an online data science course"
        ],
        'Personal Growth': [
            "Develop a daily meditation practice",
            "Read 24 books this year",
            "Improve work-life balance"
        ]
    };

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: goal.length > 0 ? 1.02 : 1,
            friction: 4,
            useNativeDriver: true
        }).start();
    }, [goal]);

    const handleContinue = () => {
        if (goal.trim().length < 10) {
            toast('Please provide a more detailed goal', 'error');
            return;
        }
        navigation.navigate('PlanGenerator', { goal });
    };

    const toggleExamples = (category) => {
        setSelectedCategory(category);
        setShowExamples(!showExamples);
        Animated.timing(fadeAnim, {
            toValue: showExamples ? 0 : 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    };

    const renderGradientText = (text) => (
        <MaskedView
            maskElement={
                <View style={{ backgroundColor: 'transparent' }}>
                    <Text style={styles.gradientTextMask}>{text}</Text>
                </View>
            }
        >
            <LinearGradient
                colors={['#6C4BFF', '#8A4FFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text style={[styles.gradientTextMask, { opacity: 0 }]}>{text}</Text>
            </LinearGradient>
        </MaskedView>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.headerContainer}>
                            {renderGradientText('Craft Your Vision')}
                            <Text style={styles.subtitle}>
                                Transform your aspirations into a personalized roadmap
                            </Text>
                        </View>

                        <View style={styles.categoriesContainer}>
                            {categories.map((category) => (
                                <TouchableOpacity
                                    key={category.name}
                                    style={[
                                        styles.categoryCard,
                                        selectedCategory === category.name && styles.selectedCategory
                                    ]}
                                    onPress={() => toggleExamples(category.name)}
                                    activeOpacity={0.8}
                                >
                                    {category.icon}
                                    <View style={styles.categoryTextContainer}>
                                        <Text style={styles.categoryName}>{category.name}</Text>
                                        <Text style={styles.categoryDescription}>
                                            {category.description}
                                        </Text>
                                    </View>
                                    <ArrowRight size={20} color="#6C4BFF" />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Animated.View
                            style={[
                                styles.promptContainer,
                                { transform: [{ scale: scaleAnim }] }
                            ]}
                        >
                            <TextInput
                                multiline
                                placeholder="I want to transform my life by..."
                                placeholderTextColor="#AAAAAA"
                                style={styles.goalInput}
                                value={goal}
                                onChangeText={setGoal}
                                numberOfLines={4}
                            />

                            {showExamples && selectedCategory && (
                                <Animated.View
                                    style={[
                                        styles.examplesContainer,
                                        { opacity: fadeAnim }
                                    ]}
                                >
                                    {exampleGoals[selectedCategory].map((example, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.exampleItem}
                                            onPress={() => setGoal(example)}
                                            activeOpacity={0.8}
                                        >
                                            <Sparkles size={16} color="#6C4BFF" style={styles.exampleIcon} />
                                            <Text style={styles.exampleText}>{example}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </Animated.View>
                            )}
                        </Animated.View>

                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={handleContinue}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#6C4BFF', '#8A4FFF']}
                                style={styles.gradientButton}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.continueButtonText}>Generate My Plan</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    container: {
        flex: 1
    },
    scrollContainer: {
        flexGrow: 1,
        padding: width * 0.05,
        paddingTop: height * 0.03,
        paddingBottom: height * 0.05,
        justifyContent: 'space-between'
    },
    headerContainer: {
        marginBottom: height * 0.03,
        alignItems: 'center'
    },
    gradientTextMask: {
        fontSize: width * 0.08,
        fontWeight: '800',
        color: '#333333'
    },
    subtitle: {
        fontSize: width * 0.04,
        color: '#666666',
        marginTop: 8,
        textAlign: 'center',
        lineHeight: width * 0.06
    },
    categoriesContainer: {
        marginBottom: height * 0.03
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: width * 0.04,
        marginBottom: height * 0.015,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    selectedCategory: {
        borderColor: '#6C4BFF',
        backgroundColor: '#F3F4FF'
    },
    categoryTextContainer: {
        flex: 1,
        marginLeft: width * 0.04
    },
    categoryName: {
        fontSize: width * 0.045,
        fontWeight: '600',
        color: '#333333'
    },
    categoryDescription: {
        fontSize: width * 0.035,
        color: '#666666',
        marginTop: 4
    },
    promptContainer: {
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: width * 0.05,
        marginBottom: height * 0.03,
        borderWidth: 1,
        borderColor: '#E5E7EB'
    },
    goalInput: {
        minHeight: height * 0.2,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: width * 0.04,
        textAlignVertical: 'top',
        fontSize: width * 0.04,
        color: '#333333'
    },
    examplesContainer: {
        marginTop: height * 0.02
    },
    exampleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: width * 0.03,
        marginBottom: height * 0.01
    },
    exampleIcon: {
        marginRight: width * 0.03
    },
    exampleText: {
        flex: 1,
        color: '#4B5563',
        fontSize: width * 0.035
    },
    continueButton: {
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: height * 0.02,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    gradientButton: {
        padding: height * 0.025,
        alignItems: 'center',
        justifyContent: 'center'
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: width * 0.04,
        fontWeight: '600'
    }
});

export default GoalSettingScreen;
