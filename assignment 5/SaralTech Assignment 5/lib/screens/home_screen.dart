import 'package:flutter/material.dart';
import '../models/todo_item.dart';
import 'add_edit_screen.dart';
import 'package:intl/intl.dart';

class HomeScreen extends StatefulWidget {
  final VoidCallback toggleTheme;

  const HomeScreen({super.key, required this.toggleTheme});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<TodoItem> items = [
    TodoItem(
      title: "Submit SaralTech Assignments",
      description: "Submit all 5 pending assignments",
      deadline: DateTime(2025, 5, 24, 9, 0),
    ),
    TodoItem(
      title: "Attend Interview",
      description: "Prepare for Interview",
      deadline: DateTime(2025, 5, 26, 17, 30),
    ),
    TodoItem(
      title: "Attend Webinor",
      description: "AWS Fundamentals",
      deadline: DateTime(2025, 5, 28, 14, 0),
    ),
  ];

  void _addOrEditItem({TodoItem? item, int? index}) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => AddEditScreen(item: item),
      ),
    );

    if (result != null && result is TodoItem) {
      setState(() {
        if (index != null) {
          items[index] = result;
        } else {
          items.add(result);
        }
      });
    }
  }

  void _deleteItem(int index) {
    setState(() {
      items.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Tasks'),
        actions: [
          IconButton(
            icon: const Icon(Icons.brightness_6),
            tooltip: 'Toggle Theme',
            onPressed: widget.toggleTheme,
          ),
        ],
      ),
      body: items.isEmpty
          ? const Center(child: Text("No to-do items yet!", style: TextStyle(fontSize: 18)))
          : ListView.builder(
        itemCount: items.length,
        itemBuilder: (context, index) {
          final item = items[index];
          final formattedDeadline = DateFormat('dd-MM-yyyy hh:mm a').format(item.deadline);
          return Card(
            child: ListTile(
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              title: Text(item.title, style: const TextStyle(fontWeight: FontWeight.bold)),
              subtitle: Padding(
                padding: const EdgeInsets.only(top: 4),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(item.description),
                    const SizedBox(height: 4),
                    Text(
                      'Deadline: $formattedDeadline',
                      style: TextStyle(color: Colors.orange.shade700, fontWeight: FontWeight.w500),
                    ),
                  ],
                ),
              ),
              trailing: Wrap(
                spacing: 8,
                children: [
                  IconButton(
                    icon: const Icon(Icons.edit, color: Colors.teal),
                    tooltip: 'Edit',
                    onPressed: () => _addOrEditItem(item: item, index: index),
                  ),
                  IconButton(
                    icon: const Icon(Icons.delete, color: Colors.redAccent),
                    tooltip: 'Delete',
                    onPressed: () => _deleteItem(index),
                  ),
                ],
              ),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _addOrEditItem(),
        backgroundColor: isDark ? Colors.tealAccent[400] : Colors.teal,
        child: Icon(Icons.add, color: isDark ? Colors.black : Colors.white),
      ),
    );
  }
}