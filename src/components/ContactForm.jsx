import React, { Component } from 'react';

class ContactForm extends Component {
	state = {
		name: '',
		number: '',
		error: '', // Для повідомлень про помилку
	};
	
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value, error: '' });
	};
	
	validateName = (name) => {
		const nameRegex = /^[a-zA-Zа-яА-Я]+([ '-][a-zA-Zа-яА-Я]+)*$/;
		return nameRegex.test(name);
	};
	
	validateNumber = (number) => {
		const numberRegex = /^\+?\d{1,4}?[-. ()]?\(?\d{1,3}\)?[-. ()]?\d{1,4}[-. ()]?\d{1,4}([- .()]?\d{1,9})?$/;
		return numberRegex.test(number);
	};
	
	handleSubmit = (e) => {
		e.preventDefault();
		const { name, number } = this.state;
		
		if (!this.validateName(name)) {
			this.setState({ error: 'Invalid name. Only letters, spaces, apostrophes and dashes allowed.' });
			return;
		}
		
		if (!this.validateNumber(number)) {
			this.setState({ error: 'Invalid phone number format.' });
			return;
		}
		
		this.props.onAddContact(name, number);
		this.setState({ name: '', number: '', error: '' });
	};
	
	render() {
		const { name, number, error } = this.state;
		
		return (
			<form className="form" onSubmit={this.handleSubmit}>
				<label>
					Name
					<input
						type="text"
						name="name"
						value={name}
						onChange={this.handleChange}
						required
					/>
				</label>
				<label>
					Number
					<input
						type="tel"
						name="number"
						value={number}
						onChange={this.handleChange}
						required
					/>
				</label>
				{error && <p className="error">{error}</p>}
				<button type="submit" className="btn">Add contact</button>
			</form>
		);
	}
}

export default ContactForm;
