import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Navbar from '@/components/Navbar';
import { router, useLocalSearchParams } from 'expo-router';

export default function UpdateTrip() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!id) return;
    setTimeout(() => {
      setForm({
        vehicle_id: "1",
        driver_id: "1",
        start_time: "2024-07-01 09:00",
        start_location: "Chennai",
        end_location: "Madurai",
      });
      setFetching(false);
    }, 500);
  }, [id]);

  const handleChange = (field: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !form.vehicle_id ||
      !form.driver_id ||
      !form.start_time ||
      !form.start_location ||
      !form.end_location
    ) {
      Alert.alert("Missing Fields", "Please fill all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Trip updated successfully!");
      router.back();
    }, 1000);
  };

  if (fetching) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Navbar title="Update Trip" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#f97316" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Trip</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Vehicle ID *</Text>
        <TextInput
          style={styles.input}
          value={form.vehicle_id || ""}
          onChangeText={(v) => handleChange("vehicle_id", v)}
          placeholder="Vehicle ID"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Driver ID *</Text>
        <TextInput
          style={styles.input}
          value={form.driver_id || ""}
          onChangeText={(v) => handleChange("driver_id", v)}
          placeholder="Driver ID"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Start Time (YYYY-MM-DD HH:mm) *</Text>
        <TextInput
          style={styles.input}
          value={form.start_time || ""}
          onChangeText={(v) => handleChange("start_time", v)}
          placeholder="2024-07-01 09:00"
        />
        <Text style={styles.label}>Start Location *</Text>
        <TextInput
          style={styles.input}
          value={form.start_location || ""}
          onChangeText={(v) => handleChange("start_location", v)}
          placeholder="Start Location"
        />
        <Text style={styles.label}>End Location *</Text>
        <TextInput
          style={styles.input}
          value={form.end_location || ""}
          onChangeText={(v) => handleChange("end_location", v)}
          placeholder="End Location"
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="create" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.submitBtnText}>Update Trip</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8fafc",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  backBtn: {
    marginRight: 10,
    padding: 4,
    borderRadius: 20,
    backgroundColor: "#fff7ed",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f97316",
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#374151",
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f97316",
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    marginTop: 22,
  },
  submitBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
}); 