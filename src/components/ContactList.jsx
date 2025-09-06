import React from 'react';
import ContactItem from './ContactItem.jsx';

const ContactList = ({ contacts, onDelete }) => (
	<ul className="list">
		{contacts.map((contact) => (
			<ContactItem
				key={contact.id}
				contact={contact}
				onDelete={onDelete}
			/>
		))}
	</ul>
);

export default ContactList;
