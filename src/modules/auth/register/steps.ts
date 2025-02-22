export const steps = [
    {
        title: "Personal Information",
        description: "Please enter your personal details",
        fields: ["firstName", "lastName", "fatherName", "motherName"],
    },
    {
        title: "Contact Information",
        description: "Please enter your contact details",
        fields: ["email", "password", "phone"],
    },
    {
        title: "Address",
        description: "Please enter your address details",
        fields: ["address.street", "address.building", "address.floor", "address.country", "address.city"],
    },
    {
        title: "Additional Information",
        description: "Please provide some additional details",
        fields: ["nationality", "department"],
    },
]