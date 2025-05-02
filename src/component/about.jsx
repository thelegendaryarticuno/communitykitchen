// About.jsx
import { motion } from 'framer-motion';

function About() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/3 backdrop-blur-lg bg-[#34755A]/30 rounded-2xl p-6 shadow-lg border border-[#FFFFFF]/20 max-h-[calc(100vh-10rem)] overflow-hidden"
        >
            <h2 className="text-2xl font-bold text-[#FFFFFF] mb-6">Community Kitchen Database Guide</h2>

            <div className="space-y-6 overflow-y-auto pr-4 h-full"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#FFFFFF40 transparent'
                }}>
                <div className="text-[#FFFFFF]">
                    <p className="mb-6">
                        Our Community Kitchen Management System helps organize and streamline kitchen operations, ensuring efficient meal service to the community.
                    </p>

                    <div className="space-y-4">
                        <div className="bg-[#FFFFFF]/10 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">🧑‍🤝‍🧑 Volunteer Information</h3>
                            <p>Find out which volunteers are available on specific days, their roles, and contact details.</p>
                        </div>

                        <div className="bg-[#FFFFFF]/10 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">🍽️ Meal Management</h3>
                            <p>Check meal types, quantities prepared, and delivery details.</p>
                        </div>

                        <div className="bg-[#FFFFFF]/10 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">📦 Food Supply Tracking</h3>
                            <p>View inventory levels, expiry dates, storage locations, and supplier details.</p>
                        </div>

                        <div className="bg-[#FFFFFF]/10 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">🏢 Supplier Information</h3>
                            <p>Access contact details, delivery schedules, and items supplied.</p>
                        </div>

                        <div className="bg-[#FFFFFF]/10 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">🗺️ Outreach Zones</h3>
                            <p>Information about delivery zones, locations, and scheduled dates.</p>
                        </div>

                        <div className="bg-[#FFFFFF]/10 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">📊 Operations Summary</h3>
                            <p>Get insights about meals prepared, volunteer assignments, and supply quantities.</p>
                        </div>
                    </div>

                    <div className="mt-6 bg-[#FFFFFF]/10 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">💡 Example Queries</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li>"Show all volunteers available on Sunday"</li>
                            <li>"How many meals were prepared for Zone A?"</li>
                            <li>"List all food items expiring this week"</li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default About;
