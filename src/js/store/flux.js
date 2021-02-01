import { Modal } from "../component/Modal";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			APIurl: "https://assets.breatheco.de/apis/fake/contact",
			agenda: "olivaresandres",
			contacts: null,
			id_contact: null,
			full_name: "",
			email: "",
			address: "",
			phone: "",
			show_modal: false
		},
		actions: {
			getContactsByAgenda: () => {
				const store = getStore();
				fetch(`${store.APIurl}/agenda/${store.agenda}`)
					.then(resp => resp.json())
					.then(data => {
						setStore({
							contacts: data
						});
					});
			},
			getContactsByID: id => {
				setStore({
					id_contact: null
				});
				const store = getStore();
				fetch(`${store.APIurl}/${id}`)
					.then(resp => resp.json())
					.then(data => {
						setStore({
							id_contact: data
						});
					});
			},
			handleDelete: id => {
				getActions().getContactsByID(id);
				setStore({
					show_modal: true
				});
			},
			deleteID: () => {
				setStore({
					id_contact: data
				});
			},
			deleteModal: () => {
				setStore({
					show_modal: false
				});
			},
			deleteContactsByID: id => {
				const store = getStore();
				fetch(`${store.APIurl}/${id}`, {
					method: "DELETE"
				})
					.then(resp => resp.json())
					.then(data => {
						getActions().getContactsByAgenda();
						setStore({
							id_contact: null,
							show_modal: false
						});
					});
			},
			saveContact: history => {
				const store = getStore();
				const contact = {
					full_name: store.full_name,
					email: store.email,
					agenda_slug: store.agenda,
					address: store.address,
					phone: store.phone
				};

				fetch(`${store.APIurl}/`, {
					method: "POST",
					body: JSON.stringify(contact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						if (data.msg) {
						} else {
							getActions().getContactsByAgenda();
							history.push("/");
						}
					});
			},
			updateContact: (e, id, history) => {
				const { agenda, id_contact, APIurl } = getStore();
				let contact = {
					id: id,
					full_name: e.target.full_name.value,
					email: e.target.email.value,
					agenda_slug: agenda,
					address: e.target.address.value,
					phone: e.target.phone.value
				};

				fetch(`${APIurl}/${id_contact.id}`, {
					method: "PUT",
					body: JSON.stringify(contact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						getActions().getContactsByAgenda();
						history.push("/");
					});
			},

			handleChange: e => {
				setStore({ [e.target.name]: e.target.value });
			}
		}
	};
};

export default getState;
