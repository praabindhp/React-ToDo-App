import React, { useEffect, useState } from "react";
import "./App.css";
import ReminderList from "./components/ReminderList";
import Reminder from "./models/reminder";
import reminderService from "./services/reminder";
import NewReminder from "./components/NewReminder";

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const reminders = await reminderService.getReminders();
    setReminders(reminders);
  };

  const addReminder = async (title: string) => {
    const newReminder = await reminderService.addReminder(title);
    setReminders([newReminder, ...reminders]);
    // console.log(title);
  }

  return (
    (<div className="App">
      <NewReminder onAddReminder={addReminder}/>
      <><ReminderList items={reminders} onRemoveReminder={(id: number) => {
    setReminders(reminders.filter((reminder: { id: number; }) => {
      return reminder.id !== id;
    }));
  }}/></>
    </div>)
  );
}

export default App;
