import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Mailer from 'react-native-mail';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState('');
  const [deletedNotes, setDeletedNotes] = useState([]);

  const handleAddNote = () => {
    if (inputText !== '') {
      setNotes([...notes, inputText]);
      setInputText('');
    }
  };

  const handleDeleteNote = (index) => {
    const deletedNote = notes[index];
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
    setDeletedNotes([...deletedNotes, deletedNote]);
  };

  const handleDeleteAllNotes = () => {
    setDeletedNotes([]);
  };

  shareNote = (note) => {
    Mailer.mail(
      {
        subject: 'Ma note',
        recipients: ['destinataire@exemple.com'],
        body: note.text,
      },
      (error, event) => {
        if (error) {
          Alert.alert('Erreur', 'Impossible d\'envoyer l\'e-mail');
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TO DO LIST</Text>
      <Text style={styles.header}>CLEAN UP YOUR MIND BY CLEANING YOUR TASK</Text>
      <TextInput
        style={styles.input}
        placeholder="Ajouter une note..."
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="Ajouter" onPress={handleAddNote} />
      <View style={styles.notesContainer}>
        {notes.map((note, index) => (
          <View key={index} style={styles.noteContainer}>
            <Text style={styles.noteText}>{note}</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => handleDeleteNote(index)}>
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.shareNote(note)}>
                <Image
                  source={require('./assets/enveloppe.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      {deletedNotes.length > 0 && (
        <View style={styles.deletedNotesContainer}>
          <Text style={styles.deletedNotesHeader}>Corbeille</Text>
          <TouchableOpacity
            style={styles.deleteAllButton}
            onPress={handleDeleteAllNotes}>
            <Text style={styles.deleteAllButtonText}>Vider la corbeille</Text>
          </TouchableOpacity>
          {deletedNotes.map((note, index) => (
            <View key={index} style={styles.deletedNoteContainer}>
              <Text style={styles.deletedNoteText}>{note}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Ma ToDoListe</Text>
        <TextInput
            style={styles.input}
            placeholder="ADD THE TASK YOU NEED TO CLEAN UP"
            value={inputText}
            onChangeText={(text) => setInputText(text)}
        />
        <Button title="Ajouter" onPress={handleAddNote} />
        {notes.map((note, index) => (
            <View key={index} style={styles.noteContainer}>
                <View style={styles.noteContent}>
                    <Text style={styles.noteText}>{note}</Text>
                    <TouchableOpacity onPress={() => handleDeleteNote(index)}>
                        <AntDesign name="delete" size={24} color="red" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => shareNote(note)}>
                    <Image source={require('./assets/enveloppe.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        ))}
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
},
header: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
},
input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
},
noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
},
noteContent: {
    flexDirection: 'row',
    alignItems: 'center',
},
noteText: {
    fontSize: 18,
    marginRight: 10,
},
icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
},
});