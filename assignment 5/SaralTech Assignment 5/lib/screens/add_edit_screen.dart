import 'package:flutter/material.dart';
import '../models/todo_item.dart';

class AddEditScreen extends StatefulWidget {
  final TodoItem? item;

  const AddEditScreen({super.key, this.item});

  @override
  State<AddEditScreen> createState() => _AddEditScreenState();
}

class _AddEditScreenState extends State<AddEditScreen> {
  final _formKey = GlobalKey<FormState>();
  late String _title;
  late String _description;
  late DateTime _deadline;

  @override
  void initState() {
    super.initState();
    _title = widget.item?.title ?? '';
    _description = widget.item?.description ?? '';
    _deadline = widget.item?.deadline ?? DateTime.now().add(const Duration(days: 1));
  }

  void _saveItem() {
    if (_formKey.currentState!.validate()) {
      Navigator.pop(
        context,
        TodoItem(title: _title, description: _description, deadline: _deadline),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.item == null ? 'Add Task' : 'Edit Task'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(18.0),
        child: Card(
          elevation: 4,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Form(
              key: _formKey,
              child: ListView(
                children: [
                  TextFormField(
                    initialValue: _title,
                    decoration: const InputDecoration(
                      labelText: 'Title',
                      border: OutlineInputBorder(),
                    ),
                    onChanged: (val) => _title = val,
                    validator: (val) => val == null || val.isEmpty ? 'Enter a title' : null,
                  ),
                  const SizedBox(height: 16),
                  TextFormField(
                    initialValue: _description,
                    maxLines: 4,
                    decoration: const InputDecoration(
                      labelText: 'Description',
                      border: OutlineInputBorder(),
                    ),
                    onChanged: (val) => _description = val,
                  ),
                  const SizedBox(height: 16),
                  TextFormField(
                    readOnly: true,
                    decoration: InputDecoration(
                      labelText: 'Deadline',
                      border: const OutlineInputBorder(),
                      suffixIcon: const Icon(Icons.calendar_today),
                    ),
                    controller: TextEditingController(
                      text: '${_deadline.day}-${_deadline.month}-${_deadline.year} ${_deadline.hour}:${_deadline.minute.toString().padLeft(2, '0')}',
                    ),
                    onTap: () async {
                      final pickedDate = await showDatePicker(
                        context: context,
                        initialDate: _deadline,
                        firstDate: DateTime.now(),
                        lastDate: DateTime(2100),
                      );
                      if (pickedDate != null) {
                        final pickedTime = await showTimePicker(
                          context: context,
                          initialTime: TimeOfDay.fromDateTime(_deadline),
                        );
                        if (pickedTime != null) {
                          setState(() {
                            _deadline = DateTime(
                              pickedDate.year,
                              pickedDate.month,
                              pickedDate.day,
                              pickedTime.hour,
                              pickedTime.minute,
                            );
                          });
                        }
                      }
                    },
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      icon: Icon(Icons.save,
                          color: isDark ? Colors.black : Colors.white),
                      label: Text('Save Task',
                          style: TextStyle(
                              color: isDark ? Colors.black : Colors.white)),
                      style: ElevatedButton.styleFrom(
                        backgroundColor:
                        isDark ? Colors.tealAccent[400] : Colors.teal,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10)),
                      ),
                      onPressed: _saveItem,
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
