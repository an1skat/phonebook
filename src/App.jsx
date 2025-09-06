import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';
import Filter from './components/Filter.jsx';
import './App.css';

class App extends Component {
	state = {
		contacts: [
			{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
			{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
			{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
			{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
		],
		filter: '',
	};
	
	addContact = (name, number) => {
		const { contacts } = this.state;
		const normalizedName = name.toLowerCase();
		
		const isExist = contacts.find(
			(c) => c.name.toLowerCase() === normalizedName
		);
		
		if (isExist) {
			alert(`${name} is already in contacts!`);
			return;
		}
		
		const newContact = {
			id: nanoid(),
			name,
			number,
		};
		
		this.setState((prev) => ({
			contacts: [...prev.contacts, newContact],
		}));
	};
	
	deleteContact = (id) => {
		this.setState((prev) => ({
			contacts: prev.contacts.filter((c) => c.id !== id),
		}));
	};
	
	changeFilter = (e) => {
		this.setState({ filter: e.target.value });
	};
	
	getFilteredContacts = () => {
		const { contacts, filter } = this.state;
		return contacts.filter((c) =>
			c.name.toLowerCase().includes(filter.toLowerCase())
		);
	};
	
	render() {
		const { filter } = this.state;
		const filteredContacts = this.getFilteredContacts();
		
		return (
			<div className="app-container">
				<h1 className="title">Phonebook</h1>
				<ContactForm onAddContact={this.addContact} />
				
				<h2 className="subtitle">Contacts</h2>
				<Filter value={filter} onChange={this.changeFilter} />
				<ContactList
					contacts={filteredContacts}
					onDelete={this.deleteContact}
				/>
			</div>
		);
	}
}

export default App;
