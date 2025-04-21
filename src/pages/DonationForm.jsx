
const DonationForm = () => {
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Donation Form</h2>
        <form>
            <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input type="text" id="name" className="w-full border border-gray-300 rounded p-2" required />
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" className="w-full border border-gray-300 rounded p-2" required />
            </div>
            <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700">Donation Amount</label>
            <input type="number" id="amount" className="w-full border border-gray-300 rounded p-2" required />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Donate</button>
        </form>
        </div>
    );
    }


export default  DonationForm;