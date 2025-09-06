import React, { Component } from 'react';

class ContactForm extends Component {
	state = {
		name: '',
		number: '',
	};
	
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	
	handleSubmit = (e) => {
		e.preventDefault();
		const { name, number } = this.state;
		this.props.onAddContact(name, number);
		this.setState({ name: '', number: '' });
	};
	
	render() {
		return (
			<form className="form" onSubmit={this.handleSubmit}>
				<label>
					Name
					<input
						type="text"
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
						pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
						title="Name may contain only letters, apostrophe, dash and spaces."
						required
					/>
				</label>
				<label>
					Number
					<input
						type="tel"
						name="number"
						value={this.state.number}
						onChange={this.handleChange}
						pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
						required
					/>
				</label>
				<button type="submit" className="btn">Add contact</button>
			</form>
		);
	}
}

export default ContactForm;
