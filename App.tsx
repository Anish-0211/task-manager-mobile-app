import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

const App = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Load tasks from storage on app start
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to storage whenever tasks change
  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  // CREATE - Add new task
  const addTask = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
    setDescription('');
  };

  // UPDATE - Edit existing task
  const updateTask = () => {
    if (!editingTask || !title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    setTasks(
      tasks.map(task =>
        task.id === editingTask.id
          ? {...task, title: title.trim(), description: description.trim()}
          : task,
      ),
    );

    setEditingTask(null);
    setTitle('');
    setDescription('');
  };

  // UPDATE - Toggle task completion
  const toggleTask = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  // DELETE - Remove task
  const deleteTask = (id: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setTasks(tasks.filter(task => task.id !== id)),
        },
      ],
    );
  };

  const startEdit = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
  };

  const renderTask = ({item}: {item: Task}) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => toggleTask(item.id)}>
        <Text style={[styles.taskTitle, item.completed && styles.completed]}>
          {item.title}
        </Text>
        {item.description ? (
          <Text style={[styles.taskDescription, item.completed && styles.completed]}>
            {item.description}
          </Text>
        ) : null}
        <Text style={styles.taskDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      <View style={styles.taskActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => startEdit(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Manager</Text>
        <Text style={styles.headerSubtitle}>
          {tasks.length} tasks • {tasks.filter(t => t.completed).length} completed
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Task title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={2}
        />
        <View style={styles.formActions}>
          {editingTask ? (
            <>
              <TouchableOpacity style={styles.updateButton} onPress={updateTask}>
                <Text style={styles.buttonText}>Update Task</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderTask}
        style={styles.taskList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No tasks yet</Text>
            <Text style={styles.emptySubtext}>Add your first task above</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  form: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'row',
    gap: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    padding: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  taskList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  taskDate: {
    fontSize: 12,
    color: '#adb5bd',
  },
  completed: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  taskActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6c757d',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#adb5bd',
  },
});

export default App;
