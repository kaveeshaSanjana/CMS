import { useState } from 'react';
import { Heart, Mail, Phone, User, Menu, X, ChevronRight, ExternalLink } from 'lucide-react';
import LandingPageFooter from '../component/footer/LandingPageFooter';

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [featuredCauses, setFeaturedCauses] = useState([
        {
            id: 1,
            title: 'Clean Water Initiative',
            description: 'Providing clean water to communities in need around the world.',
            imageUrl: 'https://media.gettyimages.com/id/1469393237/video/4k-glowing-yellow-neon-text-coming-soon.jpg?s=640x640&k=20&c=dzDQuuUIod8gcf-EXQzeEXaz0iHZA6hXLn39p6QdJeI=',
            fundingGoal: 50000,
            currentFunding: 32500
        },
        {
            id: 2,
            title: 'Reforestation Project',
            description: 'Planting trees to combat deforestation and climate change.',
            imageUrl: 'https://media.gettyimages.com/id/1469393237/video/4k-glowing-yellow-neon-text-coming-soon.jpg?s=640x640&k=20&c=dzDQuuUIod8gcf-EXQzeEXaz0iHZA6hXLn39p6QdJeI=',
            fundingGoal: 25000,
            currentFunding: 18750
        },
        {
            id: 3,
            title: 'Education for All',
            description: 'Building schools and providing educational resources to underserved areas.',
            imageUrl: 'https://media.gettyimages.com/id/1469393237/video/4k-glowing-yellow-neon-text-coming-soon.jpg?s=640x640&k=20&c=dzDQuuUIod8gcf-EXQzeEXaz0iHZA6hXLn39p6QdJeI=',
            fundingGoal: 75000,
            currentFunding: 42000
        }
    ]);

    // Gold color palette
    const colors = {
        main: '#D4AF37',
        dark: '#B8860B',
        light: '#F5EFD5'
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <span className="ml-2 text-2xl font-bold" style={{ color: colors.main }}>Cause Management System</span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-700 hover:text-yellow-700 transition-colors font-medium">Home</a>
                            <a href="#causes" className="text-gray-700 hover:text-yellow-700 transition-colors font-medium">Causes</a>
                            <a href="#about" className="text-gray-700 hover:text-yellow-700 transition-colors font-medium">About</a>
                            <a href="#contact" className="text-gray-700 hover:text-yellow-700 transition-colors font-medium">Contact</a>
                        </nav>

                        {/* Desktop Action Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a
                                href="/login"
                                className="px-4 py-2 rounded font-medium border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white transition-colors"
                                style={{ borderColor: colors.main, color: colors.main }}
                            >
                                Log In
                            </a>
                            <a
                                href="/register"
                                className="px-4 py-2 rounded font-medium text-white transition-colors"
                                style={{ backgroundColor: colors.main }}
                            >
                                Register
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 border-t border-gray-200">
                            <nav className="flex flex-col space-y-4">
                                <a href="#" className="text-gray-700 hover:text-yellow-700 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Home</a>
                                <a href="#causes" className="text-gray-700 hover:text-yellow-700 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Causes</a>
                                <a href="#about" className="text-gray-700 hover:text-yellow-700 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>About</a>
                                <a href="#contact" className="text-gray-700 hover:text-yellow-700 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Contact</a>
                                <div className="flex flex-col space-y-2 pt-2">
                                    <a
                                        href="/login"
                                        className="px-4 py-2 rounded font-medium border text-center"
                                        style={{ borderColor: colors.main, color: colors.main }}
                                    >
                                        Log In
                                    </a>
                                    <a
                                        href="/register"
                                        className="px-4 py-2 rounded font-medium text-white text-center"
                                        style={{ backgroundColor: colors.main }}
                                    >
                                        Register
                                    </a>
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="py-12 md:py-20" style={{ backgroundColor: colors.light }}>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-center">
                            <div className="md:w-1/2 mb-10 md:mb-0">
                                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                                    Make a <span style={{ color: colors.main }}>Golden</span> Difference Today
                                </h1>
                                <p className="text-xl text-gray-600 mb-8">
                                    Join our community of changemakers who are transforming lives through impactful charitable initiatives.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="/causes"
                                        className="px-6 py-3 rounded font-medium text-center text-white flex items-center justify-center sm:justify-start"
                                        style={{ backgroundColor: colors.main }}
                                    >
                                        Explore Causes
                                        <ChevronRight size={18} className="ml-2" />
                                    </a>
                                    <a
                                        href="/contact"
                                        className="px-6 py-3 rounded font-medium text-center border flex items-center justify-center sm:justify-start"
                                        style={{ borderColor: colors.main, color: colors.main }}
                                    >
                                        Contact Us
                                        <Mail size={18} className="ml-2" />
                                    </a>
                                </div>
                            </div>
                            <div className="md:w-1/2 flex justify-center">
                                <div className="relative rounded-lg overflow-hidden shadow-xl w-full max-w-md">
                                    <img
                                        src="https://features.york.ac.uk/gold-for-york/assets/no7FJqFBFu/tef2023_shorthandgraphics_1900x1000-750x395.jpg"
                                        alt="Volunteers helping in a community"
                                        className="w-full h-auto"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                        <div className="p-6 text-white">
                                            <p className="font-medium text-lg">Building a brighter future together</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Causes Section */}
                <section id="causes" className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4 text-gray-800">
                                Featured <span style={{ color: colors.main }}>Causes</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Discover the initiatives making real impact in communities around the world.
                                Watch tutorial videos and learn how you can help.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredCauses.map(cause => (
                                <div key={cause.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
                                    <div className="relative pb-2/3">
                                        <img
                                            src={cause.imageUrl}
                                            alt={cause.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
                                            <Heart size={20} className="text-red-500" />
                                        </div>
                                    </div>
                                    <div className="p-5 flex-grow">
                                        <h3 className="text-xl font-bold mb-2" style={{ color: colors.main }}>{cause.title}</h3>
                                        <p className="text-gray-600 mb-4">{cause.description}</p>

                                    </div>
                                    <div className="p-5 pt-0 flex space-x-2">
                                        <a
                                            href={`/cause/${cause.id}/tutorial`}
                                            className="flex-1 py-2 rounded font-medium text-white text-center"
                                            style={{ backgroundColor: colors.main }}
                                        >
                                            Watch Tutorial
                                        </a>
                                        <a
                                            href={`/cause/${cause.id}`}
                                            className="flex-1 py-2 rounded font-medium border text-center"
                                            style={{ borderColor: colors.main, color: colors.main }}
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="about" className="py-16" style={{ backgroundColor: colors.light }}>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="md:w-1/2 mb-10 md:mb-0">
                                <div className="rounded-lg overflow-hidden shadow-xl">
                                    <img
                                        src="https://singhniranjan.com/wp-content/uploads/2022/09/Mission_0.png"
                                        alt="About our charity"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>

                            <div className="md:w-1/2 md:pl-12">
                                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                                    About <span style={{ color: colors.main }}>Our Mission</span>
                                </h2>
                                <p className="text-lg text-gray-700 mb-6">
                                    Founded in 2020, Cause Management System connects passionate individuals with causes that make real impact around the world. We believe in transparency, integrity, and measurable results.
                                </p>
                                <p className="text-lg text-gray-700 mb-8">
                                    Our platform makes it easy to learn about different charitable initiatives, understand exactly how your contribution helps, and connect directly with the organizations on the ground.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.main }}>
                                            <Heart size={20} color="white" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-bold text-gray-800">100+ Projects</h3>
                                            <p className="text-gray-600">Active worldwide</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.main }}>
                                            <User size={20} color="white" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-bold text-gray-800">10,000+</h3>
                                            <p className="text-gray-600">Donors involved</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.main }}>
                                            <ExternalLink size={20} color="white" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-bold text-gray-800">95%</h3>
                                            <p className="text-gray-600">Funds to projects</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.main }}>
                                            <Mail size={20} color="white" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-bold text-gray-800">Certified</h3>
                                            <p className="text-gray-600">Transparent operation</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4 text-gray-800">
                                Get in <span style={{ color: colors.main }}>Touch</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Have questions about our platform or specific causes? Want to learn how you can contribute? We'd love to hear from you.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col items-center">
                                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.light }}>
                                    <Mail size={24} style={{ color: colors.main }} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">Email Us</h3>
                                <p className="text-gray-600 text-center mb-4">For general inquiries</p>
                                <a
                                    href="cms@gmail.com"
                                    className="text-lg font-medium"
                                    style={{ color: colors.main }}
                                >
                                    cms@gmail.com
                                </a>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col items-center">
                                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.light }}>
                                    <Phone size={24} style={{ color: colors.main }} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">Call Us</h3>
                                <p className="text-gray-600 text-center mb-4">Mon-Fri, 9am-5pm </p>
                                <a
                                    href="tel:+0777777777"
                                    className="text-lg font-medium"
                                    style={{ color: colors.main }}
                                >
                                    tel:+0777777777
                                </a>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col items-center">
                                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.light }}>
                                    <User size={24} style={{ color: colors.main }} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">Visit Us</h3>
                                <p className="text-gray-600 text-center mb-4">Our headquarters</p>
                                <address
                                    className="text-lg font-medium text-center not-italic"
                                    style={{ color: colors.main }}
                                >
                                    Gampaha                                
                                    </address>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <a
                                href="/contact"
                                className="px-8 py-3 rounded-md font-medium text-white inline-flex items-center"
                                style={{ backgroundColor: colors.main }}
                            >
                                Contact Us Now
                                <Mail size={18} className="ml-2" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="py-12" style={{ backgroundColor: colors.light }}>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2 text-gray-800">
                                Subscribe to Our <span style={{ color: colors.main }}>Newsletter</span>
                            </h2>
                            <p className="text-gray-600">
                                Stay updated with our latest causes and success stories.
                            </p>
                        </div>

                        <form className="max-w-md mx-auto">
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-1 py-3 px-4 rounded-l border-y border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <button
                                    type="submit"
                                    className="py-3 px-6 rounded-r text-white font-medium"
                                    style={{ backgroundColor: colors.main }}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <LandingPageFooter />
            </div>
    );
}