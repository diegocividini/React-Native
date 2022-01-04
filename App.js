import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  Text,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddMode(false);
  };
  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter(
        (goal) => goal.id !== goalId
      );
    });
  };
  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>
        Add New Goals for new Year
      </Text>
      <Button
        title="Add New Goal"
        onPress={() => setIsAddMode(true)}
        style={styles.buttonAdd}
      />
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  title: {
    marginVertical: "10%",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonAdd: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    width: "50%",
  },
});
