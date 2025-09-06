import React from 'react';

const ContactItem = ({ contact, onDelete }) => (
	<li className="item">
    <span>
      {contact.name}: {contact.number}
    </span>
		<button
			className="delete-btn"
			onClick={() => onDelete(contact.id)}
		>
			Delete
		</button>
	</li>
);

export default ContactItem;
