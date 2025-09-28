import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';
import Filter from './components/Filter.jsx';
import './App.css';

class App extends Component {
	state = {
		contacts: [],
		filter: '',
	};
	
	componentDidMount() {
		const savedContacts = localStorage.getItem('contacts');
		if (savedContacts) {
			this.setState({ contacts: JSON.parse(savedContacts) });
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevState.contacts !== this.state.contacts) {
			localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
		}
	}
	
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
