import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useGetHistory } from "@/hooks/useStats";
import { errorToast } from "@/utils/toast";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';

const History = () => {
    const router = useRouter();
    const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
    const [toDate, setToDate] = useState<Date | undefined>(undefined);
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    const fromDateStr = fromDate ? fromDate.toISOString().split('T')[0] : undefined;
    const toDateStr = toDate ? toDate.toISOString().split('T')[0] : undefined;

    const { data: historyData, isLoading, error } = useGetHistory(fromDateStr, toDateStr);

    useEffect(() => {
        if (error) {
            errorToast(error instanceof Error ? error.message : 'Failed to fetch history');
        }
    }, [error]);

    const handleFromDateChange = (event: any, selectedDate?: Date) => {
        setShowFromPicker(false);
        if (selectedDate) {
            setFromDate(selectedDate);
        }
    };

    const handleToDateChange = (event: any, selectedDate?: Date) => {
        setShowToPicker(false);
        if (selectedDate) {
            setToDate(selectedDate);
        }
    };

    const clearFilters = () => {
        setFromDate(undefined);
        setToDate(undefined);
    };

    const handleEditMatch = (matchId: string, match: any) => {
        router.push({
            pathname: '/editMatch',
            params: {
                id: matchId,
                manziGoals: match.manziGoals,
                manziFreekicks: match.manziFreekicks,
                johnsonGoals: match.johnsonGoals,
                johnsonFreekicks: match.johnsonFreekicks,
                createdAt: match.createdAt
            }
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <LinearGradient
                colors={['#7C3AED', '#EC4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute top-0 left-0 right-0 h-48"
            />
            <ScrollView className="flex-1">
                <View className="w-full px-5 pt-6">
                    <Text className="font-poppinsB text-white text-3xl">Match History</Text>
                    <Text className="font-poppins text-white/80 text-sm mt-1">Review past games</Text>

                    {/* Date Filters */}
                    <View className="mt-6 mb-4">
                        <View className="flex-row gap-3 mb-2">
                            <View className="flex-1">
                                <Text className="font-poppinsM text-xs mb-2 text-white/90">From Date</Text>
                                <Pressable
                                    onPress={() => setShowFromPicker(true)}
                                    className="bg-white rounded-xl p-3.5 flex-row items-center justify-between"
                                    style={{shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3}}
                                >
                                    <Text className="font-poppins text-sm text-gray-700">
                                        {fromDate ? fromDate.toLocaleDateString() : 'Select'}
                                    </Text>
                                    <Ionicons name="calendar" size={18} color="#7C3AED" />
                                </Pressable>
                            </View>
                            <View className="flex-1">
                                <Text className="font-poppinsM text-xs mb-2 text-white/90">To Date</Text>
                                <Pressable
                                    onPress={() => setShowToPicker(true)}
                                    className="bg-white rounded-xl p-3.5 flex-row items-center justify-between"
                                    style={{shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3}}
                                >
                                    <Text className="font-poppins text-sm text-gray-700">
                                        {toDate ? toDate.toLocaleDateString() : 'Select'}
                                    </Text>
                                    <Ionicons name="calendar" size={18} color="#EC4899" />
                                </Pressable>
                            </View>
                        </View>
                        {(fromDate || toDate) && (
                            <Pressable onPress={clearFilters} className="self-end mt-2 bg-white/20 px-4 py-2 rounded-lg">
                                <Text className="font-poppinsM text-xs text-white">Clear filters</Text>
                            </Pressable>
                        )}
                    </View>

                    {/* Date Pickers */}
                    {showFromPicker && (
                        <DateTimePicker
                            value={fromDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleFromDateChange}
                        />
                    )}
                    {showToPicker && (
                        <DateTimePicker
                            value={toDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleToDateChange}
                        />
                    )}

                    {/* Loading State */}
                    {isLoading && (
                        <View className="items-center py-12 bg-white rounded-2xl mx-1" style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5}}>
                            <ActivityIndicator size="large" color="#7C3AED" />
                            <Text className="font-poppinsM text-base mt-4 text-gray-600">Loading matches...</Text>
                        </View>
                    )}

                    {/* History Data */}
                    {!isLoading && historyData && historyData.data.length === 0 && (
                        <View className="items-center py-12 bg-white rounded-2xl mx-1" style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5}}>
                            <Ionicons name="folder-open-outline" size={48} color="#D1D5DB" />
                            <Text className="font-poppinsM text-base mt-4 text-gray-600">No matches found</Text>
                        </View>
                    )}

                    {!isLoading && historyData && historyData.data.map((dayData) => (
                        <View key={dayData.date} className="mb-5">
                            <View className="flex-row items-center mb-3 ml-1">
                                <Ionicons name="calendar-outline" size={16} color="#7C3AED" />
                                <Text className="font-poppinsS text-sm ml-2 text-gray-800">
                                    {new Date(dayData.date).toLocaleDateString('en-US', { 
                                        weekday: 'short', 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}
                                </Text>
                            </View>
                            {dayData.matches.map((match, index) => {
                                const manziWon = match.manziGoals > match.johnsonGoals;
                                const johnsonWon = match.johnsonGoals > match.manziGoals;
                                const draw = match.manziGoals === match.johnsonGoals;

                                return (
                                    <Pressable
                                        key={match._id}
                                        onPress={() => handleEditMatch(match._id, match)}
                                    >
                                        <View 
                                            className={`bg-white rounded-2xl p-4 ${index < dayData.matches.length - 1 ? 'mb-3' : ''}`}
                                            style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4}}
                                        >
                                            <View className="flex-row items-center mb-3 pb-3 border-b border-gray-100">
                                                <View className={`w-10 h-10 rounded-xl items-center justify-center mr-3 ${manziWon ? 'bg-green-50' : johnsonWon ? 'bg-red-50' : 'bg-gray-50'}`}>
                                                    <Ionicons name={manziWon ? "trophy" : johnsonWon ? "close-circle" : "remove-circle"} size={20} color={manziWon ? "#10B981" : johnsonWon ? "#EF4444" : "#9CA3AF"} />
                                                </View>
                                                <View className="flex-1">
                                                    <Text className="font-poppinsM text-sm text-gray-700">Manzi</Text>
                                                    <Text className="font-poppins text-xs text-gray-500 mt-0.5">{match.manziFreekicks} freekicks</Text>
                                                </View>
                                                <Text className="font-poppinsB text-2xl text-gray-800">{match.manziGoals}</Text>
                                            </View>
                                            <View className="flex-row items-center">
                                                <View className={`w-10 h-10 rounded-xl items-center justify-center mr-3 ${johnsonWon ? 'bg-green-50' : manziWon ? 'bg-red-50' : 'bg-gray-50'}`}>
                                                    <Ionicons name={johnsonWon ? "trophy" : manziWon ? "close-circle" : "remove-circle"} size={20} color={johnsonWon ? "#10B981" : manziWon ? "#EF4444" : "#9CA3AF"} />
                                                </View>
                                                <View className="flex-1">
                                                    <Text className="font-poppinsM text-sm text-gray-700">Johnson</Text>
                                                    <Text className="font-poppins text-xs text-gray-500 mt-0.5">{match.johnsonFreekicks} freekicks</Text>
                                                </View>
                                                <Text className="font-poppinsB text-2xl text-gray-800">{match.johnsonGoals}</Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default History;
