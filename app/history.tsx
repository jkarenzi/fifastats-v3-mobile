import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useGetHistory } from "@/hooks/useStats";
import { errorToast } from "@/utils/toast";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

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
            <ScrollView className="flex-1">
                <View className="w-full px-4 pt-6">
                    <Text className="font-poppinsS text-custom-blue text-2xl mb-6">Match History</Text>

                    {/* Date Filters */}
                    <View className="mb-6">
                        <Text className="font-poppinsM text-base mb-3">Filter by date range</Text>
                        <View className="flex-row gap-2 mb-2">
                            <View className="flex-1">
                                <Text className="font-poppins text-sm mb-1 text-gray-600">From</Text>
                                <Pressable
                                    onPress={() => setShowFromPicker(true)}
                                    className="border border-custom-grey rounded-md p-3"
                                >
                                    <Text className="font-poppins text-sm">
                                        {fromDate ? fromDate.toLocaleDateString() : 'Select date'}
                                    </Text>
                                </Pressable>
                            </View>
                            <View className="flex-1">
                                <Text className="font-poppins text-sm mb-1 text-gray-600">To</Text>
                                <Pressable
                                    onPress={() => setShowToPicker(true)}
                                    className="border border-custom-grey rounded-md p-3"
                                >
                                    <Text className="font-poppins text-sm">
                                        {toDate ? toDate.toLocaleDateString() : 'Select date'}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        {(fromDate || toDate) && (
                            <Pressable onPress={clearFilters} className="self-end mt-2">
                                <Text className="font-poppins text-sm text-custom-blue">Clear filters</Text>
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
                        <View className="items-center py-8">
                            <ActivityIndicator size="large" color="#3A66BD" />
                            <Text className="font-poppins text-base mt-4 text-gray-600">Loading history...</Text>
                        </View>
                    )}

                    {/* History Data */}
                    {!isLoading && historyData && historyData.data.length === 0 && (
                        <View className="items-center py-8">
                            <Text className="font-poppins text-base text-gray-600">No matches found</Text>
                        </View>
                    )}

                    {!isLoading && historyData && historyData.data.map((dayData) => (
                        <View key={dayData.date} className="mb-6">
                            <Text className="font-poppinsM text-base mb-3 text-gray-800">
                                {new Date(dayData.date).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                })}
                            </Text>
                            {dayData.matches.map((match, index) => {
                                const manziWon = match.manziGoals > match.johnsonGoals;
                                const johnsonWon = match.johnsonGoals > match.manziGoals;
                                const draw = match.manziGoals === match.johnsonGoals;

                                return (
                                    <View 
                                        key={match._id} 
                                        className={`bg-gray-50 rounded-lg p-4 ${index < dayData.matches.length - 1 ? 'mb-3' : ''}`}
                                    >
                                        <View className="flex-row justify-between items-center">
                                            <View className="flex-1">
                                                <View className="flex-row items-center mb-2">
                                                    <View className={`w-2 h-2 rounded-full mr-2 ${manziWon ? 'bg-green-500' : johnsonWon ? 'bg-red-500' : 'bg-gray-400'}`} />
                                                    <Text className="font-poppinsM text-sm">Manzi</Text>
                                                    <Text className="font-poppinsB text-base ml-auto mr-4">{match.manziGoals}</Text>
                                                </View>
                                                <View className="flex-row items-center">
                                                    <View className={`w-2 h-2 rounded-full mr-2 ${johnsonWon ? 'bg-green-500' : manziWon ? 'bg-red-500' : 'bg-gray-400'}`} />
                                                    <Text className="font-poppinsM text-sm">Johnson</Text>
                                                    <Text className="font-poppinsB text-base ml-auto mr-4">{match.johnsonGoals}</Text>
                                                </View>
                                                <Text className="font-poppins text-xs text-gray-500 mt-2">
                                                    Freekicks: M:{match.manziFreekicks} | J:{match.johnsonFreekicks}
                                                </Text>
                                            </View>
                                            <Pressable
                                                onPress={() => handleEditMatch(match._id, match)}
                                                className="ml-2 p-2 bg-custom-blue rounded-md"
                                            >
                                                <MaterialIcons name="edit" size={20} color="white" />
                                            </Pressable>
                                        </View>
                                    </View>
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
